import { FormHelperText } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import {v4 as uuidv4} from 'uuid';
import React from 'react';
interface HtmlEditorProps {
  initialValue?: string;
  value?: string;
  label: string;
  height?: number;
  menubar?: boolean;
  helperText?: string | undefined;
  error?: boolean;
  onChange?: (val: string) => void;
  onEditorUpdate?: (val: string) => void;
}
const HtmlEditor: React.FC<HtmlEditorProps> = ({
  value,
  label,
  height = 500,
  helperText,
  menubar = true,
  onChange,
  onEditorUpdate
}) => {
  const [initialVal, setInitialValue] = React.useState<string | undefined>('');
  return (
    <>
      {label && <FormHelperText>{label}</FormHelperText>}
      <Editor
        apiKey="vpavhf8ut0x88g8ubh6l4fslj7gdx4wdsg0rxh2k0xuq4u1r"
        id={label.split(" ").join("_")+uuidv4()}
        initialValue={initialVal}
        onInit={(_evt, _editor) => {
          setInitialValue(value)
        }}
        value={value}
        init={{
          height: height,
          menubar: menubar,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'emoticons',
            'code',
            'template',
            'contextmenu',
          ],
          toolbar:
            'code | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
        }}
        onEditorChange={(val:any) => {
          onEditorUpdate && onEditorUpdate(val);
        }}

        onChange={(val:any)=>{
          onChange && onChange(val as string);
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
};

export default HtmlEditor;
