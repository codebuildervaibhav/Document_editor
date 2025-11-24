import React from 'react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { FaBold, FaItalic, FaStrikethrough, FaLink } from 'react-icons/fa'

export const BubbleMenu = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <TiptapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href
            const url = window.prompt('Enter URL', previousUrl)
            if (url === null) return
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run()
              return
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
          }}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <FaLink />
        </button>
      </div>
    </TiptapBubbleMenu>
  )
}
