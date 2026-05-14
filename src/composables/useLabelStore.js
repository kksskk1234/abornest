import { reactive } from 'vue'

const store = reactive({
  // 상태
  labelWidth: 100,
  labelHeight: 150,
  autoHeight: true,
  fontSizeBrand: 14,
  fontSizeTitle: 5.1,
  fontSizeInfo: 2.85,
  fontSizeCaution: 2.8,
  brand: '',
  title: '',
  infoText: '입고상품명 :\n구성 :\n용도: \n재질 : \n제조국 : \n수입 및 판매원 : \n소비자상담실 :',
  cautionTitle: '',
  cautionText: '',
  barcodeValue: '',
  barcodeThickness: 2.0,
  barcodeHeightVal: 80,
  barcodeError: false,
  pdfLoading: false,

  // 표시 여부
  showBrand: true,
  showTitle: true,
  showInfo: true,
  showCaution: true,
  showBarcode: true,

  // 각 항목 패딩 (mm) — top/right/bottom/left
  paddingBrand: { top: 2, right: 0, bottom: 6, left: 0 },
  paddingTitle: { top: 0, right: 0, bottom: 6, left: 0 },
  paddingInfo: { top: 0, right: 0, bottom: 4, left: 0 },
  paddingCaution: { top: 6, right: 0, bottom: 6, left: 0 },
  paddingBarcode: { top: 5, right: 0, bottom: 0, left: 0 },

  // 파생 값 (getter — Vue reactive proxy가 this를 통해 의존성 추적)
  get labelContainerStyle() {
    return {
      width: `${this.labelWidth}mm`,
      height: this.autoHeight ? 'auto' : `${this.labelHeight}mm`,
      minWidth: 0,
      minHeight: 0,
      overflow: this.autoHeight ? 'visible' : 'hidden',
    }
  },
  get labelInnerStyle() {
    const w = this.labelWidth
    const padH = Math.min(8, w * 0.08)
    const padV = Math.min(10, w * 0.1)
    return { padding: `${padV}mm ${padH}mm` }
  },
  get parsedInfoLines() {
    return this.infoText
      .split('\n')
      .filter((l) => l.trim())
      .map((line) => {
        if (line.includes(':')) {
          const parts = line.split(':')
          const key = parts[0].trim()
          const val = parts.slice(1).join(':').trim()
          return { key: key.startsWith('[') ? key : `[${key}]`, val }
        }
        return { key: null, val: line.trim() }
      })
  },
  get parsedCautionLines() {
    return this.cautionText.split('\n').filter((l) => l.trim())
  },
})

export function useLabelStore() {
  return store
}

export function padStyle(p) {
  return { padding: `${p.top}mm ${p.right}mm ${p.bottom}mm ${p.left}mm` }
}
