export default function PageTitle({ children }) {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-12">
      {children}
    </h1>
  )
}
