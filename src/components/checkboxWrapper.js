import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import CircleCheckedFilled from '@mui/icons-material/CheckCircle'
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked'

// a wrapper class for material ui checkbox
// Since you are just using the mui checkbox, simply pass all the props through to restore functionality.
const CheckboxWrapper = React.forwardRef((props, ref) => (
    <Checkbox
        icon={<CircleUnchecked />}
        checkedIcon={<CircleCheckedFilled />}
        ref={ref}
        {...props}
    />
))

CheckboxWrapper.displayName = 'CheckboxWrapper'

export default CheckboxWrapper
