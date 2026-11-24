import type { UploadedDocument } from '../../types'
import { BankStatementView } from '../BankStatementView/BankStatementView'
import { FlyerView } from '../FlyerView/FlyerView'
import { ReceiptView } from '../ReceiptView/ReceiptView'

interface DocumentViewProps {
  doc: UploadedDocument
  className?: string
}

export const DocumentView = ({ doc, className }: DocumentViewProps) => {
  switch (doc.kind) {
    case 'receipt':
      return <ReceiptView receipt={doc} className={className} />
    case 'bankStatement':
      return <BankStatementView statement={doc} className={className} />
    case 'flyer':
      return <FlyerView flyer={doc} className={className} />
  }
}
