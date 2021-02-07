import markdownStyles from './markdown-styles.module.css'

export default function TeamMemberBody({ content }) {
  return (
    <div
      className={markdownStyles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
