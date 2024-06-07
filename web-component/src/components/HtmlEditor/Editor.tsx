import EmailEditor from '@editex/react-email-editor'
import { useEffect, useRef, useState } from 'react'

import style from './Editor.module.css'

interface IEmailEditorProps {
  containerId: string
  name: string
}

export default function MyEmailEditor({
  containerId,
  name,
}: IEmailEditorProps) {
  const emailEditorRef = useRef<EmailEditor>(null)
  const [emailData, setEmailData] = useState<[] | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setEmailData([])
    }, 1000)
  }, [])

  const exportHtml = () => {
    if (!emailEditorRef.current) return
    const html = emailEditorRef.current.exportHtml()
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.download = 'email.html'
    a.href = URL.createObjectURL(blob)
    a.click()
  }

  const showEmailData = () => {
    console.log(emailEditorRef.current.blockList)
  }

  return (
    <div
      className={style['page-container']}
      style={{ height: '800px', display: 'grid', gridTemplateRows: 'auto 1fr' }}
    >
      <div
        className="page-header"
        style={{ height: '50px', width: '100%', backgroundColor: 'red' }}
      >
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={showEmailData}>Show email data</button>
      </div>
      <div style={{ overflow: 'auto' }}>
        {emailData ? (
          <EmailEditor ref={emailEditorRef} defaultBlockList={emailData} />
        ) : (
          <>Loading....</>
        )}
      </div>
    </div>
  )
}
