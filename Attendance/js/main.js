const Container = document.querySelector('.container')
const form = document.querySelector('#form')
const input = form['input']


let today = new Date
let hours = Math.floor(today.getHours() / 2)
let minutes = today.getMinutes()
let current_time = `${hours}:${minutes} ${'AM'}`


const staffs = JSON.parse(localStorage.getItem('staff')) || []

const addStaffs = (name) => {
    staffs.push({
        name,
    })

    localStorage.setItem('staff', JSON.stringify(staffs))
    return { name }
}

const getDetails = ({ name }) => {

    const result = document.createElement('div')
    const userIcon = document.createElement('h3')
    const input_el = document.createElement('input')
    const button_el = document.createElement('button')
    const span_el = document.createElement('span')
    const delete_el = document.createElement('div')

    delete_el.classList.add('delete')
    result.classList.add('result')
    input_el.classList.add('input')
    button_el.classList.add('button')
    span_el.classList.add('span')
    userIcon.classList.add('h3')

    span_el.innerHTML = current_time + ' ' + '<i class="fa fa-check"></i>'
    button_el.innerText = `sign-out`
    userIcon.innerHTML = '<i class="fa fa-user"></i>'
    input_el.value = name
    input_el.setAttribute('readonly', 'readonly')
    delete_el.innerHTML = '<i class="fa fa-times"></i>'

    button_el.addEventListener('click', () => {
        result.classList.add('complete')
        button_el.innerText = 'Worked'
        button_el.classList.add('btn')
    })

    result.append(userIcon, input_el, button_el, span_el, delete_el)
    Container.appendChild(result)
}

staffs.forEach(getDetails)


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value.length == '') return alert('Please input your name!')

    const newStaff = addStaffs(
        input.value,
    );

    getDetails(newStaff)

    input.value = ''
});

Container.addEventListener('click', deleteCheck)

function deleteCheck(e) {
    const item = e.target //delete todo
    console.log(item)
    if (item.classList[0] === 'result') {
        const staff = item.parentElement;
        removeLocalStaff(staff);
        item.remove()
    }
}

function removeLocalStaff(staff) {
    let staffs;
    if (localStorage.getItem('staff') === null) {
        staffs = []
    } else {
        staffs = JSON.parse(localStorage.getItem('staff'));
        const staffIndex = staff.children[0].innerText;
        staffs.splice(staffs.indexOf(staffIndex), 1);
        localStorage.setItem('staff', JSON.stringify(staffs));
    }
}