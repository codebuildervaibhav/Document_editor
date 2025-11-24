import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Toolbar } from './Toolbar'
import { BubbleMenu } from './BubbleMenu'
import '../styles/editor.scss'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: `
      <h1>Welcome to your new Document Editor! 📝</h1>
      <p>This is a powerful editor built with Tiptap and React. It features:</p>
      <ul>
        <li>Rich text formatting (Bold, Italic, Strike)</li>
        <li>Headings and Lists</li>
        <li><strong>Advanced Tables</strong> with resizing and context menu</li>
        <li>Image support</li>
        <li>Text Alignment</li>
      </ul>
      <p>Try selecting this text to see the floating menu!</p>
      <blockquote>
        "Simplicity is the ultimate sophistication." - Leonardo da Vinci
      </blockquote>
      <p>Here is a table for you to try:</p>
      <table>
        <tbody>
          <tr>
            <th>Feature</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
          <tr>
            <td>Tables</td>
            <td>✅ Ready</td>
            <td>Try adding rows/cols</td>
          </tr>
          <tr>
            <td>Images</td>
            <td>✅ Ready</td>
            <td>Via URL</td>
          </tr>
        </tbody>
      </table>
    `,
  })

  return (
    <div className="editor-container">
      <div className="editor-wrapper">
        <Toolbar editor={editor} />
        <BubbleMenu editor={editor} />
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  )
}

export default TiptapEditor
