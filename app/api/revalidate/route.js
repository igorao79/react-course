import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { tag } = await request.json();
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Отсутствует параметр tag' },
        { status: 400 }
      );
    }

    // Инвалидируем кеш для указанного тега
    revalidateTag(tag);

    return NextResponse.json({ 
      message: `Кеш для тега "${tag}" был инвалидирован`,
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    console.error('Ошибка инвалидации кеша:', error);
    return NextResponse.json(
      { error: 'Ошибка инвалидации кеша' },
      { status: 500 }
    );
  }
} 