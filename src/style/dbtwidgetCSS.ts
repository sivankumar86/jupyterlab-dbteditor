import { style } from 'typestyle';

export const dbtbutton = style({
    padding: '5px 10px',
    margin: '10px',
    cursor: 'pointer',
    fontSize: '20px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#339EFF',
    borderRadius: '10px',
    boxShadow: '0 9px #999',
    $nest: {
        '&:hover': {
          backgroundColor: '#336BFF'
        },
        '&:active':{
            boxShadow: '0 5px #666',
            transform: 'translateY(4px)'
        }
      }
  });

export const flexbuttonpan = style({
  display: 'flex'
})