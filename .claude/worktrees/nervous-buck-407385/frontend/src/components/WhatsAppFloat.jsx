import './WhatsAppFloat.css'

export default function WhatsAppFloat() {
  const phone   = '923218488802'
  const message = encodeURIComponent("Hi! I'd like to enquire about ACCA/CIMA study materials.")

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.493.651 4.835 1.788 6.864L2 30l7.343-1.766A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
          fill="#25D366"
        />
        <path
          d="M22.5 19.5c-.3-.15-1.77-.873-2.044-.972-.273-.099-.472-.15-.67.15-.198.3-.769.972-.942 1.17-.173.198-.347.224-.645.075-.298-.15-1.259-.464-2.398-1.48-.887-.79-1.485-1.765-1.659-2.063-.173-.298-.018-.459.13-.607.134-.133.298-.347.447-.52.148-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.614-.918-2.21-.242-.58-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.298-1.04 1.016-1.04 2.48 0 1.465 1.065 2.88 1.213 3.078.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.273-.198-.571-.347Z"
          fill="#fff"
        />
      </svg>

      {/* Tooltip label */}
      <span className="wa-float-label">Chat with us</span>
    </a>
  )
}
