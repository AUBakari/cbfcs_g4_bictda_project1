import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    // Get URL search params
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const enrolled = searchParams.get('enrolled');
    
    // Build base query
    let query = `
      SELECT 
        tm.*,
        COUNT(l.id) as total_lessons,
        COALESCE(ue.enrollment_count, 0) as enrollment_count,
        CASE 
          WHEN $1 IS NOT NULL THEN (
            SELECT CASE WHEN COUNT(*) > 0 THEN true ELSE false END
            FROM user_progress up 
            WHERE up.user_id = $1 AND up.module_id = tm.id
          )
          ELSE false
        END as is_enrolled,
        CASE 
          WHEN $1 IS NOT NULL THEN (
            SELECT COALESCE(AVG(progress_percentage), 0)
            FROM user_progress up 
            WHERE up.user_id = $1 AND up.module_id = tm.id
          )
          ELSE 0
        END as progress,
        CASE 
          WHEN $1 IS NOT NULL THEN (
            SELECT COUNT(*)
            FROM user_progress up 
            WHERE up.user_id = $1 AND up.module_id = tm.id AND up.status = 'completed'
          )
          ELSE 0
        END as lessons_completed
      FROM training_modules tm
      LEFT JOIN lessons l ON tm.id = l.module_id
      LEFT JOIN (
        SELECT module_id, COUNT(DISTINCT user_id) as enrollment_count
        FROM user_progress
        GROUP BY module_id
      ) ue ON tm.id = ue.module_id
      WHERE tm.is_active = true
    `;
    
    let params = [userId];
    let paramCount = 1;
    
    // Add category filter
    if (category) {
      paramCount++;
      query += ` AND LOWER(tm.category) = LOWER($${paramCount})`;
      params.push(category);
    }
    
    // Add difficulty filter  
    if (difficulty) {
      paramCount++;
      query += ` AND tm.difficulty_level = $${paramCount}`;
      params.push(difficulty);
    }
    
    // Add enrollment filter (only if user is authenticated)
    if (enrolled === 'true' && userId) {
      query += ` AND EXISTS (
        SELECT 1 FROM user_progress up 
        WHERE up.user_id = $1 AND up.module_id = tm.id
      )`;
    }
    
    query += `
      GROUP BY tm.id, ue.enrollment_count
      ORDER BY tm.created_at DESC
    `;
    
    const modules = await sql(query, params);
    
    return Response.json({
      success: true,
      data: modules,
      total: modules.length
    });
    
  } catch (error) {
    console.error('Error fetching training modules:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch training modules' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { success: false, error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, difficulty_level, category, estimated_duration, prerequisites, thumbnail_url } = body;
    
    // Validate required fields
    if (!title || !difficulty_level || !category) {
      return Response.json(
        { success: false, error: 'Title, difficulty level, and category are required' }, 
        { status: 400 }
      );
    }
    
    // Validate difficulty level
    if (!['beginner', 'intermediate', 'advanced'].includes(difficulty_level)) {
      return Response.json(
        { success: false, error: 'Difficulty level must be beginner, intermediate, or advanced' }, 
        { status: 400 }
      );
    }
    
    const result = await sql`
      INSERT INTO training_modules (
        title, description, difficulty_level, category, 
        estimated_duration, prerequisites, thumbnail_url
      ) 
      VALUES (
        ${title}, ${description}, ${difficulty_level}, ${category},
        ${estimated_duration || null}, ${prerequisites || null}, ${thumbnail_url || null}
      )
      RETURNING *
    `;
    
    return Response.json({
      success: true,
      data: result[0],
      message: 'Training module created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating training module:', error);
    return Response.json(
      { success: false, error: 'Failed to create training module' }, 
      { status: 500 }
    );
  }
}