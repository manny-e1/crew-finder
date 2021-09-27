import React, { useState } from 'react'

function Checkbox() {
    const items = [
        'male','female'
    ]
    const [gender, setGender] = useState([])
    let query = '';
    if (gender.length > 0) {
        gender.forEach(applicationCoun => {
                query = query !== "" ? query + `&gender[in]=${applicationCoun}`
                                : `?gender[in]=${applicationCoun}`
            
        }
        )
    }
    console.log(query);
    const onChangeItem = (id) => {
        let selected = gender
        let find = selected.indexOf(id)
      
        if(find > -1) {
          selected.splice(find, 1)
        } else {
          selected.push(id)
        }
        setGender([...selected])
      }
    return (
        <div className="mt-1 flex lg:inline-block">
            {items.map(item=>(
                <div key={item}>
                    <label className="inline-flex items-center">
                        <input type="checkbox" 
                        onChange={() => onChangeItem(item)} 
                        />
                        <p className="mx-2">{item}</p>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Checkbox
