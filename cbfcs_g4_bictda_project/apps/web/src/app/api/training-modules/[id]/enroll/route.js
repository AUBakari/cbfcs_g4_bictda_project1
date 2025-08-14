import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { success: false, error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const moduleId = parseInt(params.id);

    if (!moduleId) {
      return Response.json(
        { success: false, error: 'Invalid module ID' }, 
        { status: 400 }
      );
    }

    // Check if module exists and is active
    const module = await sql`
      SELECT id, title FROM training_modules 
      WHERE id = ${moduleId} AND is_active = true
    `;

    if (module.length === 0) {
      return Response.json(
        { success: false, error: 'Training module not found' }, 
        { status: 404 }
      );
    }

    // Check if user is already enrolled
    const existingEnrollment = await sql`
      SELECT id FROM user_progress 
      WHERE user_id = ${userId} AND module_id = ${moduleId}
    `;

    if (existingEnrollment.length > 0) {
      return Response.json(
        { success: false, error: 'Already enrolled in this module' }, 
        { status: 400 }
      );
    }

    // Create user profile if it doesn't exist
    await sql`
      INSERT INTO user_profiles (user_id, total_points, current_streak)
      VALUES (${userId}, 0, 0)
      ON CONFLICT (user_id) DO NOTHING
    `;

    // Enroll user in the module
    const enrollment = await sql`
      INSERT INTO user_progress (
        user_id, module_id, status, progress_percentage, 
        started_at, last_accessed_at
      )
      VALUES (
        ${userId}, ${moduleId}, 'not_started', 0, 
        NOW(), NOW()
      )
      RETURNING *
    `;

    return Response.json({
      success: true,
      data: {
        enrollment: enrollment[0],
        module: module[0]
      },
      message: `Successfully enrolled in ${module[0].title}`
    });
    
  } catch (error) {
    console.error('Error enrolling in module:', error);
    return Response.json(
      { success: false, error: 'Failed to enroll in module' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { success: false, error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const moduleId = parseInt(params.id);

    if (!moduleId) {
      return Response.json(
        { success: false, error: 'Invalid module ID' }, 
        { status: 400 }
      );
    }

    // Check if user is enrolled
    const enrollment = await sql`
      SELECT id FROM user_progress 
      WHERE user_id = ${userId} AND module_id = ${moduleId}
    `;

    if (enrollment.length === 0) {
      return Response.json(
        { success: false, error: 'Not enrolled in this module' }, 
        { status: 400 }
      );
    }

    // Remove enrollment
    await sql`
      DELETE FROM user_progress 
      WHERE user_id = ${userId} AND module_id = ${moduleId}
    `;

    return Response.json({
      success: true,
      message: 'Successfully unenrolled from module'
    });
    
  } catch (error) {
    console.error('Error unenrolling from module:', error);
    return Response.json(
      { success: false, error: 'Failed to unenroll from module' }, 
      { status: 500 }
    );
  }
}