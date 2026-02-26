import EditableContent from '../components/EditableContent';
import { BGPattern } from '../components/ui/bg-pattern';

export default function ExampleEditablePage() {
  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <EditableContent
          contentKey="example-hero-title"
          defaultContent="<h1 class='cc-outline-text text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8'>EDITABLE HERO TITLE</h1>"
          className="mb-8"
        />

        <EditableContent
          contentKey="example-intro-text"
          defaultContent="<p class='text-lg text-[#A0A0A0] text-center mb-12'>This is an example page demonstrating the inline content editing system. Hover over any content block to see the edit button (only visible to belterdevelopment26@gmail.com).</p>"
          className="mb-12"
        />

        <div className="bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-lg p-6 sm:p-8 mb-8">
          <EditableContent
            contentKey="example-section-1"
            defaultContent="<h2 class='text-3xl font-bold mb-4 text-white'>Section Title</h2><p class='text-[#A0A0A0] mb-4'>This is editable content inside a card. You can edit text, add formatting, change colors, and more.</p><p class='text-[#A0A0A0]'>Try hovering over this section if you are logged in as the admin user.</p>"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-lg p-6">
            <EditableContent
              contentKey="example-card-1"
              defaultContent="<h3 class='text-2xl font-bold mb-4 text-white'>Card 1</h3><p class='text-[#A0A0A0]'>Each content block is independently editable with its own unique key.</p>"
            />
          </div>

          <div className="bg-[#1A1A1A] border-2 border-[#2E2E2E] rounded-lg p-6">
            <EditableContent
              contentKey="example-card-2"
              defaultContent="<h3 class='text-2xl font-bold mb-4 text-white'>Card 2</h3><p class='text-[#A0A0A0]'>Changes are saved to Supabase and cached for performance.</p>"
            />
          </div>
        </div>

        <div className="mt-12 bg-[#2E2E2E] border-2 border-[#3E3E3E] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>
          <ul className="text-[#A0A0A0] space-y-2 list-disc list-inside">
            <li>Only visible to user: belterdevelopment26@gmail.com</li>
            <li>Hover over content blocks to see edit button</li>
            <li>Click edit to open TipTap rich text editor</li>
            <li>Editor loads lazily only when needed</li>
            <li>Changes are saved to Supabase with RLS protection</li>
            <li>Public users see static content only</li>
            <li>No editor components loaded for non-admin users</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
