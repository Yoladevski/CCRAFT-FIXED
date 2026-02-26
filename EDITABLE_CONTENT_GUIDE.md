# Inline Content Editing System

This application includes an admin-only inline content editing system that allows live editing of on-page text content without requiring code changes or redeployment.

## Admin Access

The editing functionality is **ONLY** available to the user with the email address:
```
belterdevelopment26@gmail.com
```

No other users will see or have access to any editing functionality, even if they have admin roles in the database.

## Features

- **Lazy Loading**: The TipTap editor is only loaded when the admin activates edit mode
- **Zero Impact**: Public users see fully static content with no editor components loaded
- **Rich Text Editing**: Full formatting options including:
  - Text formatting (bold, italic, underline)
  - Headings (H1-H6)
  - Font family selection
  - Text color
  - Text alignment
  - Links
- **Database Storage**: All content is saved to Supabase with Row Level Security
- **Content Caching**: Content is fetched and cached for performance
- **Instant Updates**: Changes appear immediately without page reload

## How to Use

### For the Admin User (belterdevelopment26@gmail.com)

1. **Log in** with your admin email
2. **Navigate** to any page with editable content
3. **Hover** over content blocks - you'll see a red edit icon in the top-right corner
4. **Click** the edit icon to open the TipTap editor
5. **Edit** the content using the toolbar:
   - Select heading levels from the dropdown
   - Choose font families
   - Format text (bold, italic, underline)
   - Change text color with the color picker
   - Align text (left, center, right)
   - Add/edit links
6. **Save** your changes or **Cancel** to discard
7. Changes are automatically saved to the database and visible immediately

### For Developers

#### Using the EditableContent Component

```tsx
import EditableContent from '../components/EditableContent';

function MyPage() {
  return (
    <EditableContent
      contentKey="unique-content-key"
      defaultContent="<p>Your default HTML content here</p>"
      className="mb-4"
    />
  );
}
```

#### Props

- `contentKey` (required): A unique identifier for this content block
- `defaultContent` (required): HTML fallback content if no saved content exists
- `className` (optional): CSS classes to apply to the content wrapper

#### Content Keys

Each editable content block needs a unique `contentKey`. Use descriptive keys like:
- `home-hero-title`
- `about-intro-text`
- `section-1-content`
- `footer-disclaimer`

## Database

### Table: content_blocks

```sql
- id: uuid (primary key)
- content_key: text (unique)
- html_content: text
- created_at: timestamptz
- updated_at: timestamptz
```

### Row Level Security

- **SELECT**: Anyone can read content (public and authenticated)
- **INSERT/UPDATE/DELETE**: Only `belterdevelopment26@gmail.com` can modify content

## Example Page

Visit `/example-editable` to see a demonstration page with multiple editable content blocks.

## Security

1. **Email Verification**: Admin status is verified using Supabase session `user.email`
2. **RLS Protection**: Database policies prevent unauthorized writes
3. **HTML Sanitization**: All HTML is sanitized before saving to prevent XSS attacks
4. **Lazy Loading**: Editor code is never loaded for non-admin users

## Technical Details

### Components

- `EditableContent.tsx`: Main wrapper component with conditional rendering
- `TipTapEditor.tsx`: Rich text editor with toolbar (lazy loaded)

### Utilities

- `contentBlocks.ts`: Functions for fetching, saving, and caching content

### Dependencies

- `@tiptap/react`: Core TipTap React integration
- `@tiptap/starter-kit`: Basic editing features
- `@tiptap/extension-*`: Additional formatting extensions
- `dompurify`: HTML sanitization

## Performance

- Editor bundle (~350KB) is only loaded for admin when entering edit mode
- Public users have zero performance impact
- Content is cached in memory after first fetch
- Updates use optimistic UI updates for instant feedback

## Troubleshooting

### Edit button not showing
- Ensure you're logged in as `belterdevelopment26@gmail.com`
- Clear your browser cache and reload
- Check browser console for errors

### Changes not saving
- Verify your Supabase connection in `.env`
- Check browser console for RLS policy errors
- Ensure the admin email is exactly correct

### Content not loading
- Check Supabase connection
- Verify RLS policies are enabled
- Check browser console for fetch errors
