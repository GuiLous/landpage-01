import { Icon } from '@chakra-ui/react'

export default function BlockIcon(props) {
  return (
    <Icon viewBox="0 0 13 14" {...props}>
      <path
        d="M11.1042 6.99546C11.1042 6.02033 10.8587 5.12697 10.3678 4.31538L3.98633 11.1564C4.75933 11.6954 5.59722 11.965 6.5 11.965C7.1263 11.965 7.72298 11.8332 8.29004 11.5698C8.8571 11.3063 9.34657 10.9535 9.75846 10.5114C10.1704 10.0692 10.4976 9.54077 10.7402 8.92602C10.9829 8.31127 11.1042 7.66775 11.1042 6.99546ZM2.64909 9.71188L9.03906 2.86178C8.27734 2.31062 7.43099 2.03504 6.5 2.03504C5.66493 2.03504 4.89475 2.25611 4.18945 2.69825C3.48416 3.14039 2.92556 3.74302 2.51367 4.50617C2.10178 5.26931 1.89583 6.09907 1.89583 6.99546C1.89583 7.97664 2.14692 8.88211 2.64909 9.71188ZM13 6.99546C13 7.94636 12.8279 8.85486 12.4837 9.72096C12.1395 10.5871 11.6783 11.332 11.0999 11.9559C10.5216 12.5797 9.8304 13.0764 9.02637 13.4458C8.22233 13.8153 7.38021 14 6.5 14C5.61979 14 4.77767 13.8153 3.97363 13.4458C3.1696 13.0764 2.47841 12.5797 1.90007 11.9559C1.32172 11.332 0.86046 10.5871 0.516276 9.72096C0.172092 8.85486 0 7.94636 0 6.99546C0 6.04456 0.172092 5.13757 0.516276 4.2745C0.86046 3.41142 1.32172 2.66796 1.90007 2.04413C2.47841 1.42029 3.1696 0.923643 3.97363 0.554186C4.77767 0.184729 5.61979 0 6.5 0C7.38021 0 8.22233 0.184729 9.02637 0.554186C9.8304 0.923643 10.5216 1.42029 11.0999 2.04413C11.6783 2.66796 12.1395 3.41142 12.4837 4.2745C12.8279 5.13757 13 6.04456 13 6.99546Z"
        fill={props.fill}
      />
    </Icon>
  )
}
