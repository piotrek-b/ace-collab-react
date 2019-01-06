import styled from 'styled-components'

export default (component) => (...styles) => styled(component)`
    &&& {
        ${styles}
    }
`
