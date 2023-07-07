document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the stored username from local storage
    let username = localStorage.getItem('username')

    // Assigning variables
    const card = document.getElementById('cardElement')
    const userInput = document.getElementById('userinput')
    const userSubmitBtn = document.getElementById('usernamesubmit')
    const divElement = document.getElementById('greetings')
    const todoList = document.getElementById('todoList')
    const addButton = document.getElementById('addButton')
    const newTodoInput = document.getElementById('newTodo')
    const favWebsiteBtn = document.getElementById('addWebsite')
    const websiteCard = document.getElementById('websiteCard');
    const favWebsite = document.getElementById('horizontal-list')
    const addWebsiteButton = document.getElementById('addWebsiteButton')
    const websiteInput = document.getElementById('websiteInput')
    const websiteName = document.getElementById('websiteName')

    // Load saved tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    for (const task of savedTasks) {
        createTodoItem(task)
    }

    // Load favourite websites from local storage
    const savedWebsites = JSON.parse(localStorage.getItem('websites')) || []
    for (const website of savedWebsites) {
        createWebsiteItem(website.url, website.name)
    }


    // Hide the card element
    card.style.display = 'none'
    websiteCard.style.display = 'none'
    // Check if the username is null or empty
    if (username === null || username === '') {
        // Show the card element
        card.style.display = 'block'
        // Add an event listener to the submit button

        userSubmitBtn.addEventListener('click', function () {
            // Retrieve the user input value
            let userInputVal = userInput.value

            // Store the username in local storage
            localStorage.setItem('username', userInputVal)
            username = userInputVal
            card.style.display = 'none'

            let element = document.createElement('h1')
            element.textContent = 'Hello ' + username
            element.style.textAlign = 'center'
            divElement.appendChild(element)
        })
        userInput.addEventListener('keydown', function (event) {
            if (event.key === "Enter") {
                userSubmitBtn.click()
            }
        })
    } else {
        let element = document.createElement('h1')
        element.textContent = 'Hello ' + username
        element.style.textAlign = 'center'
        divElement.appendChild(element)
    }

    function createTodoItem(task) {
        const li = document.createElement('li')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.checked
        const label = document.createElement('label')
        label.classList.add('labels')
        label.textContent = task.text
        if (task.checked) {
            label.classList.add('completed')
        }
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('delete-button')

        // Add event listener to delete button
        deleteButton.addEventListener('click', function () {
            li.remove()
            saveTasks()
        })
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                label.classList.add('completed')
            } else {
                label.classList.remove('completed')
            }
            saveTasks()
        })
        li.appendChild(checkbox)
        li.appendChild(label)
        li.appendChild(deleteButton)
        todoList.appendChild(li)
    }

    function createWebsiteItem(website, websiteName) {
        // Create an image element
        const websiteImage = document.createElement('img');
        websiteImage.src = `https://www.google.com/s2/favicons?domain=${website}`;
        websiteImage.alt = websiteName;
        websiteImage.classList.add('website-image');


        // Create an anchor element to wrap the image and make it clickable
        const websiteLink = document.createElement('a');
        websiteLink.href = website;
        // websiteLink.target = '_blank';
        websiteLink.appendChild(websiteImage);

        // Create a container element
        const container = document.createElement('div');
        container.style.position = 'relative';


        // Create a dotted line element
        const dottedLine = document.createElement('div');
        dottedLine.style.display = 'none'
        dottedLine.textContent = '❌';
        dottedLine.style.fontSize = '12px';
        dottedLine.style.cursor = 'pointer';
        dottedLine.style.position = 'absolute';
        dottedLine.style.top = '0';
        dottedLine.style.right = '0';

        // making dotted visible only on hover 
        websiteLink.addEventListener('mouseover', () => {
            dottedLine.style.display = 'block' // Apply the dotted line style on hover
        });

        websiteLink.addEventListener('mouseout', () => {
            dottedLine.style.display = 'none'  // Remove the dotted line style when not hovering
        });

        dottedLine.addEventListener('mouseover', () => {
            dottedLine.style.display = 'block' // Apply the dotted line style on hover
        });

        dottedLine.addEventListener('mouseout', () => {
            dottedLine.style.display = 'none'  // Remove the dotted line style when not hovering
        });


        // Add event listener to dotted line element
        dottedLine.addEventListener('click', function () {
            if (confirm(`Are you sure you want to delete ${websiteName}?`)) {
                listItem.remove();
                saveWebsites();
            }
        });

        // Create a span element for the website name
        const websiteNameElement = document.createElement('span');
        websiteNameElement.textContent = websiteName.split(' ')[0];
        websiteNameElement.title = websiteName;
        websiteNameElement.style.color = 'white';
        websiteNameElement.style.fontSize = '14px';
        websiteNameElement.style.width = '50px';
        websiteNameElement.style.height = '20px';
        websiteNameElement.style.overflow = 'hidden';

        // Create a list item and append the anchor element and span element to it
        const listItem = document.createElement('li');
        container.appendChild(websiteLink);
        container.appendChild(dottedLine);
        container.appendChild(websiteNameElement);
        listItem.appendChild(container);

        // Add styles to the list item
        listItem.style.width = '60px';
        listItem.style.height = '60px';
        listItem.style.display = 'flex';
        listItem.style.flexDirection = 'column';
        listItem.style.justifyContent = 'center';
        listItem.style.alignItems = 'center';
        listItem.style.margin = '0 10px';

        // Add styles to the anchor element
        websiteLink.style.display = 'flex';
        websiteLink.style.justifyContent = 'center';
        websiteLink.style.alignItems = 'center';
        websiteLink.style.width = '50px';
        websiteLink.style.height = '50px';
        websiteLink.style.backgroundColor = 'white';
        websiteLink.style.borderRadius = '50%'; // half of the width and height
        websiteLink.style.marginBottom = '1px';



        // Append the list item to the favWebsite ul
        favWebsite.appendChild(listItem);
    }

    // Event listener for add button
    addButton.addEventListener('click', function () {
        const taskText = newTodoInput.value
        if (taskText.trim() !== '') {
            const task = {
                text: taskText,
                checked: false
            }
            createTodoItem(task)
            newTodoInput.value = ''
            saveTasks()
        }
    })

    // Event listener for Enter key press in input field
    newTodoInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addButton.click()
        }
    })

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = []
        const todoItems = todoList.getElementsByTagName('li')
        for (const item of todoItems) {
            const label = item.querySelector('label')
            const checkbox = item.querySelector('input[type="checkbox"]')
            tasks.push({
                text: label.textContent,
                checked: checkbox.checked
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    favWebsiteBtn.addEventListener('click', function () {
        websiteCard.style.display = 'block';
        websiteCard.classList.toggle('show');
        document.body.classList.toggle('blur');
    })

    addWebsiteButton.addEventListener('click', () => {
        const websiteURL = websiteInput.value;
        const webname = websiteName.value;
        if (websiteURL.trim() !== '' && webname.trim() !== '') {
            createWebsiteItem(websiteURL, webname)
            websiteInput.value = '';
            websiteName.value = '';
            saveWebsites()
            websiteCard.style.display = 'none';
            websiteCard.classList.toggle('show');
            document.body.classList.toggle('blur');
        }
    });


    function saveWebsites() {
        const websites = []
        const websiteItems = favWebsite.getElementsByTagName('li')
        for (const item of websiteItems) {
            const label = item.querySelector('a')
            const websiteNameElement = item.querySelector('span')
            websites.push({
                url: label.href,
                name: websiteNameElement.textContent
            })
        }
        localStorage.setItem('websites', JSON.stringify(websites))
    }

    // hiding the favwebsite card when their is  a click on body 
    document.addEventListener('click', function (event) {
        if (websiteCard.style.display === 'block') {
            if (!websiteCard.contains(event.target) && event.target !== favWebsiteBtn) {
                websiteCard.style.display = 'none';
                websiteCard.classList.toggle('show');
                document.body.classList.toggle('blur');
            }
        }
    });
})




