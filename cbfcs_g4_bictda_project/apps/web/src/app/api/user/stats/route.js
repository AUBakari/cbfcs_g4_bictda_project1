import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { success: false, error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Create user profile if it doesn't exist
    await sql`
      INSERT INTO user_profiles (user_id, total_points, current_streak)
      VALUES (${userId}, 0, 0)
      ON CONFLICT (user_id) DO NOTHING
    `;

    // Get comprehensive user stats
    const stats = await sql`
      WITH user_stats AS (
        SELECT 
          -- Module enrollment stats
          (SELECT COUNT(DISTINCT module_id) FROM user_progress WHERE user_id = ${userId}) as total_enrolled_modules,
          (SELECT COUNT(DISTINCT module_id) FROM user_progress WHERE user_id = ${userId} AND status = 'completed') as completed_modules,
          
          -- Points and achievements
          COALESCE(up.total_points, 0) as total_points,
          (SELECT COUNT(*) FROM user_badges WHERE user_id = ${userId}) as total_badges,
          (SELECT COUNT(*) FROM certificates WHERE user_id = ${userId}) as total_certificates,
          
          -- Weekly progress
          (
            SELECT COUNT(*)
            FROM user_progress 
            WHERE user_id = ${userId} 
            AND last_accessed_at >= NOW() - INTERVAL '7 days'
          ) as weekly_activity,
          
          -- Current streak
          COALESCE(up.current_streak, 0) as current_streak,
          
          -- Recent quiz scores
          (
            SELECT AVG(score_percentage)
            FROM quiz_attempts 
            WHERE user_id = ${userId}
            AND completed_at >= NOW() - INTERVAL '30 days'
          ) as avg_recent_quiz_score,
          
          -- This week's points
          (
            SELECT COALESCE(SUM(qa.points_earned), 0)
            FROM quiz_attempts qa
            WHERE qa.user_id = ${userId}
            AND qa.completed_at >= NOW() - INTERVAL '7 days'
          ) as weekly_points
          
        FROM user_profiles up
        WHERE up.user_id = ${userId}
      )
      SELECT 
        total_enrolled_modules,
        completed_modules,
        total_points,
        total_badges,
        total_certificates,
        weekly_activity,
        current_streak,
        ROUND(COALESCE(avg_recent_quiz_score, 0), 1) as avg_quiz_score,
        weekly_points
      FROM user_stats
    `;

    const userStats = stats[0];

    // Calculate weekly progress percentage (target could be 5 activities per week)
    const weeklyTarget = 5;
    const weeklyProgress = Math.min(100, Math.round((userStats.weekly_activity / weeklyTarget) * 100));

    // Format response data
    const responseData = [
      {
        id: "modules",
        title: "Training Modules",
        value: userStats.total_enrolled_modules.toString(),
        subValue: `${userStats.completed_modules} completed`,
        icon: "BookOpen",
        bgColor: "bg-[#DDF7F5] dark:bg-[#1A2F2B]",
        borderColor: "border-[#30C4B5] dark:border-[#30C4B5]",
        accentColor: "#30C4B5",
        darkAccentColor: "#30C4B5",
        textColor: "text-[#30C4B5] dark:text-[#30C4B5]",
        hoverBorderColor: "hover:border-[#29AF9F] dark:hover:border-[#29AF9F]",
      },
      {
        id: "points",
        title: "Total Points",
        value: userStats.total_points.toString(),
        subValue: userStats.weekly_points > 0 ? `+${userStats.weekly_points} this week` : 'No points this week',
        icon: "Trophy",
        bgColor: "bg-[#FFF1E4] dark:bg-[#3D2B1A]",
        borderColor: "border-[#FF8C42] dark:border-[#FF8C42]",
        accentColor: "#FF8C42",
        darkAccentColor: "#FF8C42",
        textColor: "text-[#FF8C42] dark:text-[#FF8C42]",
        hoverBorderColor: "hover:border-[#E07A38] dark:hover:border-[#E07A38]",
      },
      {
        id: "certificates",
        title: "Certificates",
        value: userStats.total_certificates.toString(),
        subValue: "Gov verified",
        icon: "Award",
        bgColor: "bg-[#EFE9FF] dark:bg-[#2A2440]",
        borderColor: "border-[#6366F1] dark:border-[#6366F1]",
        accentColor: "#6366F1",
        darkAccentColor: "#6366F1",
        textColor: "text-[#6366F1] dark:text-[#6366F1]",
        hoverBorderColor: "hover:border-[#5A5AD8] dark:hover:border-[#5A5AD8]",
      },
      {
        id: "progress",
        title: "Weekly Progress",
        value: `${weeklyProgress}%`,
        subValue: `Target: ${weeklyTarget} activities`,
        icon: "TrendingUp",
        bgColor: "bg-[#ECFDF5] dark:bg-[#1A2E1A]",
        borderColor: "border-[#10B981] dark:border-[#10B981]",
        accentColor: "#10B981",
        darkAccentColor: "#10B981",
        textColor: "text-[#10B981] dark:text-[#10B981]",
        hoverBorderColor: "hover:border-[#0FA370] dark:hover:border-[#0FA370]",
      },
    ];

    return Response.json({
      success: true,
      data: responseData,
      metadata: {
        userId: userId,
        lastUpdated: new Date().toISOString(),
        rawStats: userStats
      }
    });
    
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch user statistics' }, 
      { status: 500 }
    );
  }
}