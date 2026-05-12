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
  infoText: '',
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

  // 파생 값 (getter — Vue reactive proxy가 this를 통해 의존성 추적)
  get labelContainerStyle() {
    return {
      width: `${this.labelWidth}mm`,
      minHeight: this.autoHeight ? 'auto' : `${this.labelHeight}mm`,
    }
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
