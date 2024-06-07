import { Reader, TReaderDocument } from '@usewaypoint/email-builder'
import { useEffect, useRef, useState } from 'react'

import style from './Editor.module.css'

interface IEmailEditorProps {
  containerId: string
  name: string
}

const CONFIGURATION: TReaderDocument = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F8F8F8',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: ['block-1709578146127'],
    },
  },
  'block-1709578146127': {
    type: 'Text',
    data: {
      style: {
        fontWeight: 'normal',
        padding: {
          top: 16,
          bottom: 16,
          right: 24,
          left: 24,
        },
      },
      props: {
        text: 'Hello world',
      },
    },
  },
}

export default function MyEmailEditor({
  containerId,
  name,
}: IEmailEditorProps) {
  return <Reader document={CONFIGURATION} rootBlockId="root" />
}
