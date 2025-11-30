import React, { useCallback } from 'react'
import { 
  FaBold, FaItalic, FaStrikethrough, FaListUl, FaListOl, 
  FaQuoteRight, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, 
  FaAlignRight, FaAlignJustify, FaTable, FaImage, FaLink, FaUnlink,
  FaFilePdf, FaFileCode, FaFileDownload
} from 'react-icons/fa'

export const Toolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const saveAsPDF = useCallback(() => {
    // Use browser's print dialog to save as PDF
    window.print()
  }, [])

  const saveAsHTML = useCallback(() => {
    const html = editor.getHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    a.click()
    URL.revokeObjectURL(url)
  }, [editor])

  const saveAsJSON = useCallback(() => {
    const json = JSON.stringify(editor.getJSON(), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [editor])

  const isTable = editor.isActive('table')

  return (
    <div className="toolbar">
      {/* History */}
      <div className="button-group">
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <FaRedo />
        </button>
      </div>

      <div className="divider" />

      {/* Formatting */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strike"
        >
          <FaStrikethrough />
        </button>
      </div>

      <div className="divider" />

      {/* Headings */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
      </div>

      <div className="divider" />

      {/* Alignment */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          title="Align Right"
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          title="Justify"
        >
          <FaAlignJustify />
        </button>
      </div>

      <div className="divider" />

      {/* Lists */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Ordered List"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="Quote"
        >
          <FaQuoteRight />
        </button>
      </div>

      <div className="divider" />

      {/* Media */}
      <div className="button-group">
        <button onClick={addImage} title="Insert Image">
          <FaImage />
        </button>
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title="Link">
          <FaLink />
        </button>
        <button 
          onClick={() => editor.chain().focus().unsetLink().run()} 
          disabled={!editor.isActive('link')}
          title="Unlink"
        >
          <FaUnlink />
        </button>
      </div>

      <div className="divider" />

      {/* Tables */}
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          <FaTable />
        </button>
        
        {isTable && (
          <>
            <button onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column">+Col</button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column">-Col</button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row">+Row</button>
            <button onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row">-Row</button>
            <button onClick={() => editor.chain().focus().deleteTable().run()} style={{color: '#d32f2f'}} title="Delete Table">Del</button>
          </>
        )}
      </div>

      <div className="divider" />

      {/* Save/Export */}
      <div className="button-group">
        <button onClick={saveAsPDF} title="Print to PDF">
          <FaFilePdf /> PDF
        </button>
        <button onClick={saveAsHTML} title="Save as HTML">
          <FaFileCode /> HTML
        </button>
        <button onClick={saveAsJSON} title="Save as JSON">
          <FaFileDownload /> JSON
        </button>
      </div>
    </div>
  )
}
