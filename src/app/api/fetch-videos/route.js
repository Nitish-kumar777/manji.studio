import cloudinary from '@/lib/cloudinary';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title'); // Get the title from the query parameters

  try {
    // Build the search expression based on the title (if provided)
    let expression = 'resource_type:video AND folder:nextjs_videos';
    if (title) {
      expression += ` AND context.title=${title}`; // Search by title in the context metadata
    }

    // Fetch videos from Cloudinary based on the expression
    const { resources } = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .max_results(10)
      .execute();

    return new Response(JSON.stringify({ success: true, videos: resources }), { status: 200 });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch videos', error: error.message }), { status: 500 });
  }
}