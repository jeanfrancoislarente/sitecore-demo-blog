import PostTitle from '../components/post-title'

export default function PostHeader({ title, primaryTopic }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className={`mb-8 blog-title-block blog-title-block-${primaryTopic}`}>
        {primaryTopic}
      </div>
    </>
  )
}
