const FILE_READER = new FileReader()

let header = document.createElement('h1')
let para = document.createElement('p')
let notifier = document.createElement('p')
let file_input = document.createElement('input')
let main_container = document.createElement('div')
let text_container = document.createElement('div')
let image_container = document.createElement('div')
let bin_text = document.createElement('p')
let bin_image = document.createElement('img')

header.innerHTML = "convert image files to binary:"
para.innerHTML = "Use the input below to upload your images."

notifier.innerHTML = "Your results are ready!"
notifier.style.display = "none"

file_input.type = "file"
file_input.accept="image/*"
file_input.addEventListener('change', file_upload)

bin_image.src = " "
bin_image.alt = "image_upload"

bin_text.innerHTML = " "

main_container.appendChild(image_container)
main_container.appendChild(text_container)
image_container.appendChild(bin_image)
text_container.appendChild(bin_text)

document.body.appendChild(header)
document.body.appendChild(para)
document.body.appendChild(file_input)
document.body.appendChild(notifier)
document.body.appendChild(main_container)

document.body.style.backgroundColor = 'bisque'
document.body.style.textAlign = "center"

function file_upload(e) {
    const file = e.target.files[0]
    
    FILE_READER.readAsBinaryString(file)
    
    console.log(`\x1b[32m File: ${typeof file} \x1b[37m`, file)
}

FILE_READER.onload = (e1) => {
    const BIN = e1.target.result
    const HEADERS = "data:image/png;"
    const ENCODING = "base64,"
    const ASCII = btoa(BIN)
    const BASE64_ASCII_BINARY_STRING = `${HEADERS}${ENCODING}${ASCII}`
    
    bin_image.src = BASE64_ASCII_BINARY_STRING
    bin_image.style.display = "none"
    
    bin_text.innerHTML = `${ASCII}`

    bin_text.style.display = "flex"

    notifier.style.display = "flex"
    
    let submit_button = document.createElement('input')
    submit_button.type="submit"
    submit_button.innerText = "view"
    submit_button.style.display = "flex !important"
    submit_button.addEventListener('click', view_results)

    document.body.appendChild(submit_button)
}

function view_results() {
    bin_image.style.display = "flex"
    bin_image.style.aspectRatio = "1 / 1"
    bin_image.style.objectFit = "contain"

    main_container.style.display = "flex"
    main_container.style.flexDirection = "row"
    main_container.style.justifyContent = "center"
    main_container.style.gap = "250px"

    image_container.style.border = "2px solid black"
    image_container.style.padding = "5px"
    image_container.style.display = "flex"
    image_container.style.justifyContent = "center"
    image_container.style.width = "500px"
    image_container.style.height = "500px"

    notifier.style.display = "none"

    text_container.style.border = "2px solid black"
    text_container.style.padding = "5px"
    text_container.style.display = "flex"
    text_container.style.justifyContent = "center"
    text_container.style.width = "500px"
    text_container.style.height = "500px"
    text_container.style.lineBreak = "anywhere"
    text_container.style.maxWidth = "500px"
    text_container.style.overflowY = "scroll"
}