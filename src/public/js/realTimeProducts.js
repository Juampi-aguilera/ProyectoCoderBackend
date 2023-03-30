const socket = io()

const submitButton = document.getElementById("addButton");
const deleteButton = document.getElementById("delButton");

function getId() {
    const idToDelete = parseInt(document.getElementById("delId").value)
    return idToDelete
}


function getData() {

    const title = document.getElementById("addTitle").value;
    const description = document.getElementById("addDescription").value;
    const price = parseInt(document.getElementById("addPrice").value)
    const code = document.getElementById("addCode").value;
    const stock = parseInt(document.getElementById("addStock").value)
    const thumbnail = document.getElementById("addThumbnail").value;

    if (
        !(
            title == "" ||
            description == "" ||
            code == "" ||
            price == "" ||
            stock == "" ||
            thumbnail == ""
        )
    ) {
        productToAdd = {
            title: title,
            description: description,
            price: price,
            code: code,
            stock: stock,
            thumbnail: thumbnail
        };

        return productToAdd;
    } else {
        return alert("Debe completar todos los campos");
    }
}

submitButton.addEventListener("click", (evt) => {
    let productToAdd = getData();
    socket.emit("product", productToAdd)
});

deleteButton.addEventListener("click", (evt) => {
    let id = getId()
    socket.emit("deleteProduct", id)
})