import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';

interface TipTapEditorProps {
  content: string;
  onUpdate: (html: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function TipTapEditor({ content, onUpdate, onSave, onCancel }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#B11226] underline',
        },
      }),
      TextStyle,
      Color,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Underline,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4 bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-lg',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="tiptap-editor-container">
      <div className="toolbar bg-[#2E2E2E] p-2 rounded-t-lg border-2 border-[#2E2E2E] border-b-0 flex flex-wrap gap-2">
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: parseInt(value) as any }).run();
            }
          }}
          className="px-2 py-1 bg-[#1A1A1A] border border-[#3E3E3E] rounded text-sm text-white"
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="px-2 py-1 bg-[#1A1A1A] border border-[#3E3E3E] rounded text-sm text-white"
        >
          <option value="">Default</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive('bold') ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic ${
            editor.isActive('italic') ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded text-sm underline ${
            editor.isActive('underline') ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          U
        </button>

        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color || '#ffffff'}
          className="w-8 h-8 rounded cursor-pointer"
        />

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          L
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          C
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          R
        </button>

        <button
          onClick={setLink}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('link') ? 'bg-[#B11226] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#3E3E3E]'
          }`}
        >
          Link
        </button>

        <div className="flex-grow"></div>

        <button
          onClick={onCancel}
          className="px-4 py-1 rounded text-sm bg-[#3E3E3E] text-white hover:bg-[#4E4E4E]"
        >
          Cancel
        </button>

        <button
          onClick={onSave}
          className="px-4 py-1 rounded text-sm bg-[#B11226] text-white hover:bg-[#8B0E1E]"
        >
          Save
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
