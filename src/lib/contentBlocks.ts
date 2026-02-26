import { supabase } from './supabase';
import DOMPurify from 'dompurify';

const ADMIN_EMAIL = 'belterdevelopment26@gmail.com';

const contentCache = new Map<string, string>();

export function isContentAdmin(userEmail: string | undefined): boolean {
  return userEmail === ADMIN_EMAIL;
}

export async function fetchContentBlock(contentKey: string, defaultContent: string): Promise<string> {
  if (contentCache.has(contentKey)) {
    return contentCache.get(contentKey)!;
  }

  const { data, error } = await supabase
    .from('content_blocks')
    .select('html_content')
    .eq('content_key', contentKey)
    .maybeSingle();

  if (error) {
    console.error('Error fetching content block:', error);
    return defaultContent;
  }

  const content = data?.html_content || defaultContent;
  contentCache.set(contentKey, content);
  return content;
}

export async function saveContentBlock(contentKey: string, htmlContent: string): Promise<boolean> {
  const sanitizedContent = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
  });

  const { data: existing } = await supabase
    .from('content_blocks')
    .select('id')
    .eq('content_key', contentKey)
    .maybeSingle();

  let result;

  if (existing) {
    result = await supabase
      .from('content_blocks')
      .update({ html_content: sanitizedContent })
      .eq('content_key', contentKey);
  } else {
    result = await supabase
      .from('content_blocks')
      .insert({ content_key: contentKey, html_content: sanitizedContent });
  }

  if (result.error) {
    console.error('Error saving content block:', result.error);
    return false;
  }

  contentCache.set(contentKey, sanitizedContent);
  return true;
}

export function clearContentCache(contentKey?: string) {
  if (contentKey) {
    contentCache.delete(contentKey);
  } else {
    contentCache.clear();
  }
}
