import { useState, useEffect, lazy, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchContentBlock, saveContentBlock, isContentAdmin } from '../lib/contentBlocks';
import { Pencil } from 'lucide-react';

const TipTapEditor = lazy(() => import('./TipTapEditor'));

interface EditableContentProps {
  contentKey: string;
  defaultContent: string;
  className?: string;
}

export default function EditableContent({ contentKey, defaultContent, className = '' }: EditableContentProps) {
  const { user } = useAuth();
  const [content, setContent] = useState<string>(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedContent, setEditedContent] = useState<string>('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = isContentAdmin(user?.email);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      const loadedContent = await fetchContentBlock(contentKey, defaultContent);
      setContent(loadedContent);
      setIsLoading(false);
    }

    loadContent();
  }, [contentKey, defaultContent]);

  const handleEdit = () => {
    setEditedContent(content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveContentBlock(contentKey, editedContent);

    if (success) {
      setContent(editedContent);
      setIsEditing(false);
    } else {
      alert('Failed to save content. Please try again.');
    }

    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedContent('');
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-[#2E2E2E] rounded ${className}`}>
        <div className="h-20"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (isEditing) {
    return (
      <div className={className}>
        <Suspense fallback={
          <div className="bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-lg p-4">
            <div className="text-[#A0A0A0]">Loading editor...</div>
          </div>
        }>
          <TipTapEditor
            content={editedContent}
            onUpdate={setEditedContent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
          {isSaving && (
            <div className="mt-2 text-sm text-[#A0A0A0]">Saving...</div>
          )}
        </Suspense>
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      {showEditButton && (
        <button
          onClick={handleEdit}
          className="absolute top-0 right-0 -mt-2 -mr-2 bg-[#B11226] hover:bg-[#8B0E1E] text-white p-2 rounded-full shadow-lg transition-all z-50"
          title="Edit content"
        >
          <Pencil size={16} />
        </button>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
