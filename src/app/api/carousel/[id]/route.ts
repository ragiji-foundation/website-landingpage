import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   context: any
) {
  try {
    const { id } = await context;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/carousel/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data);

  } catch (err) {
    console.error('Carousel item fetch error:', err);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return NextResponse.json(
          { error: 'Carousel item not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: err.response?.data?.message || 'Failed to fetch carousel item' },
        { status: err.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
  try {
    const { id } = await context;

    await axios.delete(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/carousel/${id}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Carousel item deleted successfully'
    });

  } catch (err) {
    console.error('Carousel item deletion error:', err);
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        return NextResponse.json(
          { error: 'Carousel item not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: err.response?.data?.message || 'Failed to delete carousel item' },
        { status: err.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
