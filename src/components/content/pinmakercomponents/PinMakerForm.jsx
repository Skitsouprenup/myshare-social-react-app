import React, { useState } from 'react';

import { topicCategories } from "../../../scripts/categories";
import { useNavigate } from 'react-router-dom';
import { createPin } from '../../../scripts/crud/pin/createpin';
import { trimSpaces } from '../../../scripts/utilities';

import LoadingAnim from '../pinscomponents/LoadingAnim';

const PinMakerForm = ( {imgAsset, user, setSubmittingForm} ) => {
    const[loading, setLoading] = useState(false);
    //Fields: title, about, destination, category, image
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [dest, setDest] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    const textFieldStyle = `outline-none focus:shadow-sm focus:shadow-blue-300
                            w-full h-9 p-1 rounded-sm`;
                    
    const textFieldDivStyle = 'mb-2';
    const btnStyle = `rounded-md bg-white border border-gray-300
                      w-16 h-10 hover:bg-blue-300`;

    const createNewPin = () => {
      //Just basic validation. Can be improved
      //if I invest more time in this project
      if(!trimSpaces(title) || !trimSpaces(about) ||
         !trimSpaces(dest) || !imgAsset) {
          alert('Invalid input!\nPlease fill up '+ 
                'all the textboxes in the form!');
          return;
      }
      
      setLoading(true);
      setSubmittingForm(true);
       createPin(navigate, setLoading, setSubmittingForm, 
                 imgAsset, title.trim(), about.trim(), 
                 dest.trim(), user?._id, category);
       
    };

    if(loading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <LoadingAnim message='Submitting Form...'/>
      </div>
    );

    return(<div className='flex flex-col px-2'>
        <div className={textFieldDivStyle}>
          <label htmlFor='title'>Title</label>
          <input name='title'
                 type='text'
                 value={title}
                 onChange={(e) => {setTitle(e.target.value);}}
                 placeholder='Pin Title'
                 className={textFieldStyle}/>
        </div>

        <div className={textFieldDivStyle}>
          <label htmlFor='about'>About</label>
          <textarea name='about'
                 value={about}
                 onChange={(e) => {setAbout(e.target.value);}}
                 placeholder='Pin Description'
                 className={textFieldStyle}
                 style={{height: '75px', resize: 'none'}}/>
        </div>

        <div className={textFieldDivStyle}>
        <label htmlFor='destination'>Destination</label>
          <input name='destination'
                 type='text'
                 value={dest}
                 onChange={(e) => {setDest(e.target.value);}}
                 placeholder='Destination Link'
                 className={textFieldStyle}/>
        </div>
        
        <div className='flex flex-col mb-2'>
          <label htmlFor='categories'>Choose Category</label>
          <select className='outline-none p-2 w-full bg-white'
                  name='categories'
                  value={category}
                  onChange={(e) => {setCategory(e.target.value);}}>
           
            {topicCategories.slice(1, topicCategories.length).map((item) => {
              return <option value={item.name} key={item.name}>{item.name}</option>
            })}
          </select>
        </div>

        <div className='flex justify-around'>
          <button className={btnStyle}
                  onClick={createNewPin}
                  type='button'>
            Save
          </button>
          <button className={btnStyle}
                  onClick={() => {
                    navigate('/home/pins');
                  }}
                  type='button'>
            Cancel
          </button>
        </div>

      </div>);
};

export default PinMakerForm;