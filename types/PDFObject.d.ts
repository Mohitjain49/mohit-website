// This is a type declaration for the object returned by usePDF.
// https://tato30.github.io/vue-pdf/guide/composables.html#usepdf

import type { ShallowRef } from 'vue';
import type { PDFDocumentLoadingTask } from 'pdfjs-dist';
import { PDFInfo } from '@tato30/vue-pdf';

export interface usePDFObject {
    pdf: PDFDocumentLoadingTask | undefined,
    pages: ShallowRef<Number | undefined>
    info: ShallowRef<PDFInfo | undefined>
    getPDFDestination(dest: any): Promise<number> | number;
    print(options?: { dpi?: number; filename?: string }): void;
    download(options?: { filename?: string }): void;
}