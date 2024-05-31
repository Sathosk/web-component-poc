// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import arcoThemeStyle from '@arco-themes/react-easy-email-theme/css/arco.css?inline'
import { AdvancedType, BasicType, BlockManager } from 'easy-email-core'
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
} from 'easy-email-editor'
import emailEditorStyle from 'easy-email-editor/lib/style.css?inline'
import { ExtensionProps, StandardLayout } from 'easy-email-extensions'
import emailExtensionStyle from 'easy-email-extensions/lib/style.css?inline'
import React, { useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-use'

import templateData from '../../template.json'
import { IAnAmazingComponentProps } from '../AnAmazingComponent'

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
}

const categories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [[['25%', '25%', '25%', '25%']]],
      },
    ],
  },
]

export default function Editor({
  containerId,
  name,
}: IAnAmazingComponentProps) {
  const { width } = useWindowSize()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const smallScene = width < 1400

  if (!isReady) {
    return null
  }

  return (
    <>
      <style>{arcoThemeStyle}</style>
      <style>{emailEditorStyle}</style>
      <style>{emailExtensionStyle}</style>
      <EmailEditorProvider
        data={initialValues}
        height={'calc(100vh - 72px)'}
        autoComplete
        dashed={false}
      >
        {({ values }) => {
          return (
            <StandardLayout
              compact={!smallScene}
              showSourceCode={true}
              categories={categories}
            >
              <EmailEditor />
            </StandardLayout>
          )
        }}
      </EmailEditorProvider>
    </>
  )
}
