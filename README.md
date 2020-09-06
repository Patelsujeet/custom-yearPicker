# custom-Year Picker
this is custom lightning web component for Year Picker


![alt text](https://github.com/Patelsujeet/custom-yearPicker/blob/master/year%20picker.JPG)

Just call yearComponent like this and call one custom event.
   ```
     <c-year-picker onselectyear={yearPicker}></c-year-picker>
   ```
  Below is js code
    ```
      yearPicker(event){
        console.log(event.detail);
    }
    ```
