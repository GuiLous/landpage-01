export default function BaseView({ fromStory, layout, children }) {
  return fromStory ? children : layout(children)
}
