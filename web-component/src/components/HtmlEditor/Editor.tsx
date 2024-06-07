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
          <EmailEditor
            ref={emailEditorRef}
            defaultBlockList={emailData}
            language={'pt_BR'}
            customLanguageLibraries={{
              pt_BR: {
                drag_block_here: 'Arraste o bloco aqui',
                blocks: 'Blocos',
                photos: 'Fotos',
                powered_by_pexels: 'Fornecido por Pexels',
                loading: 'Carregando...',
                content: 'Conteúdo',
                body_settings: 'Configurações do Tema',
                pre_header: 'Pré-cabeçalho',
                pre_header_description:
                  'O pré-cabeçalho é um texto resumido curto que segue a linha de assunto ao visualizar um e-mail na caixa de entrada.',
                confirm: 'Confirmar',
                cancel: 'Cancelar',
                add_blocks: 'Adicionar blocos',

                // bloco de coluna
                column: 'Coluna',
                columns: 'Colunas',
                column_settings: 'Configurações da Coluna',
                column_styles: 'Estilos da Coluna',
                column_delete: 'Excluir Coluna',
                column_delete_desc:
                  'Tem certeza de que deseja excluir {{count}} colunas extras?',

                // bloco de texto
                text: 'Texto',
                text_content: 'Este é um texto, clique para editar o texto',
                text_settings: 'Configurações de Texto',
                text_styles: 'Estilos de Texto',
                text_align: 'Alinhamento de Texto',

                // bloco de cabeçalho
                heading: 'Cabeçalho',
                heading_content:
                  'Este é um cabeçalho, clique para editar o cabeçalho',
                heading_settings: 'Configurações do Cabeçalho',
                heading_type: 'Tipo de Cabeçalho',

                // bloco de botão
                button: 'Botão',
                button_settings: 'Configurações do Botão',
                button_action: 'Ação do Botão',
                button_styles: 'Estilos do Botão',
                button_padding: 'Espaçamento do Botão',

                // bloco de divisor
                divider: 'Divisor',
                divider_settings: 'Configurações do Divisor',
                divider_type: 'Tipo de Divisor',
                divider_styles: 'Estilos do Divisor',

                // bloco de imagem
                image: 'Imagem',
                image_action: 'Ação da Imagem',
                image_url: 'URL da Imagem',
                image_alt: 'Texto Alternativo da Imagem',
                image_styles: 'Estilos da Imagem',
                image_settings: 'Configurações da Imagem',

                // bloco de link social
                social_link: 'Link Social',
                social_link_settings: 'Configurações do Link Social',
                add_social_link: 'Adicionar Link Social',
                social_link_size: 'Tamanho do Link Social',
                social_links: 'Links Sociais',

                // cores
                content_background_color: 'Cor de Fundo do Conteúdo',
                background_color: 'Cor de Fundo',
                text_color: 'Cor do Texto',
                email_theme_background_color: 'Cor de Fundo do Tema do Email',
                font_color: 'Cor da Fonte',
                button_color: 'Cor do Botão',
                divider_color: 'Cor do Divisor',

                // estilos
                action_type: 'Tipo de Ação',
                top: 'Topo',
                right: 'Direita',
                left: 'Esquerda',
                bottom: 'Inferior',
                line_height: 'Altura da Linha',
                link: 'Link',
                link_url: 'URL do Link',
                padding_settings: 'Configurações de Espaçamento',
                width: 'Largura',
                height: 'Altura',
                width_auto: 'Largura Automática',
                font_size: 'Tamanho da Fonte',
                font_family: 'Família da Fonte',
                solid: 'Sólido',
                dotted: 'Pontilhado',
                dashed: 'Tracejado',
                align: 'Alinhar',
                spacing: 'Espaçamento',
              },
            }}
          />
        ) : (
          <>Loading....</>
        )}
      </div>
    </div>
  )
}
