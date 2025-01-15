import React from 'react'

export default function Entry() {
    const groups = [ 'Group1', 'Group2', 'Group3' ];
  return (
    <div className='EntryContainer'>
        <div>Create New Vehicle</div>
        <div>
            <div>
                <div>
                    <label htmlFor="">Vehicle Photo</label>
                    <input type="file" name="" id="" />
                </div>
                <div>
                    <label htmlFor="">
                        <small>[Required]</small>
                        <p>Display Name</p>
                        <small>Please enter display name(max 20 chars)</small>
                    </label>
                    <input type="text" name="" id="" placeholder='Enter your car display name'/>
                </div>
                <div>
                    <label htmlFor="">
                        <small>[Required]</small>
                        <p>Grouping Types</p>
                        <small>Please enter car's grouping types</small>
                    </label>
                    <select>
                        <option value="">--- Select ---</option>
                        {groups.map(group => <option value={group}>{group}</option>)}
                    </select>
                </div>
            </div>
            <div></div>
        </div>
    </div>
  )
}
