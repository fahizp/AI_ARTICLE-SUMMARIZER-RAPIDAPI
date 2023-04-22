import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets/index.ts";

const Demo = () => {
  return (
    <section className='section'>
      {/* Search */}
      <div className='search'>
        <form
          className='from'
          // onSubmit={}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='demo-img'
          />

          <input
            type='url'
            placeholder='Paste the article link'
            // value={}
            // onChange={}
            // onKeyDown={}
            required
            className='url_input peer' 
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        

      {/* Display Result */}
     
      </div>
    </section>
  );
}

export default Demo