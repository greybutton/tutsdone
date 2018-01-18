const defaultState = {
  images: [],
  selectedImage: "https://farm2.staticflickr.com/1553/25266806624_fdd55cecbc.jpg"
}

export default function images(state = defaultState, action) {
  switch(action.type) {
    case 'IMAGE_SELECTED':
      return {...state, selectedImage: action.image};
    case 'IMAGES_LOADED':
      return {...state, images: action.images};
    default:
      return state;
  }
}