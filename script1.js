const gameContainer = document.getElementById('game-container');
const gameText = document.getElementById('game-text');
const choices = document.getElementById('choices');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    typeText(textNode.text, () => {
        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        textNode.options.forEach(option => {
            if (showOption(option)) {
                const button = document.createElement('button');
                button.innerText = option.text;
                button.addEventListener('click', () => selectOption(option));
                choices.appendChild(button);

                if (option.url) {
                    button.addEventListener('click', () => {
                        window.location.href = option.url;
                    });
                } else {
                    button.addEventListener('click', () => selectOption(option));
                }

                choices.appendChild(button);
            }
        });

        // Show buttons after typing effect is completed
        const buttons = document.querySelectorAll('#choices button');
        buttons.forEach(button => {
            button.style.display = 'inline-block';
        });
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    // Hide buttons when an option is selected
    const buttons = document.querySelectorAll('#choices button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

function typeText(text, callback) {
    let i = 0;
    gameText.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    gameText.appendChild(cursor);

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                cursor.insertAdjacentHTML('beforebegin', '<br>');
            } else {
                cursor.insertAdjacentText('beforebegin', text.charAt(i));
            }
            i++;
            setTimeout(type, 64);
        } else {
            cursor.remove();
            callback();
        }
    }

    type();
}


const textNodes = [
    {
        id: 1,
        text: 'My name is Lucas. I am a seasoned sailor. I sail towards the uncharted ocean. One fateful day, a violent storm struck, and my ship was torn apart. I fought to stay afloat, but eventually lost consciousness. When I woke up, I found myself on the shores of a mysterious island, surrounded by a dense, dark forest. I have a backpack. The bag contains a bottle of water, some snacks, an analog watch, a torch and a "Colt 37 Revolver" which is fully loaded with 7 bullets. I\'ve checked my watch, it was 6:32pm. Disoriented and alone, I ventured into the forest, determined to survive and find a way home.',
        options: [

            {
                text: 'Take a nap',
                nextText: 3
            },
            {
                text: 'Look around',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'I can see two ways ahead of me. One leads to a cave and the other one leads to a forest.',
        options: [
            {
                text: 'Enter the cave',
                nextText: 4
            },
            {
                text: 'Enter the forest',
                nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: 'I decided to sleep in the forest. But it\'s not safe at all to sleep in the middle of a forest being completely unarmed. I must escape this forest.',
        options: [
            {
                text: 'Wake up',
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        text: 'The cave is very dark and it is impossible to see the inside of it.',
        options: [

            {
                text: 'Wait for daylight.',
                nextText: 6,
            },
            {
                text: 'Use the torch',
                nextText: 7,
            }
        ]
    },
    {
        id: 5,
        text: 'I decided to explore the forest. It\'s 8:25pm. Everything is dark and creepy. While moving forward, I suddenly heard the screaming of an unknown creature. I\'ve never heard any creature scream as loud as that. It\'s not safe to stay outside.',
        options: [
            {
                text: 'Get back to cave',
                nextText: 4,
            }
        ]
    },
    {
        id: 6,
        text: 'That\'s a very stupid decision. I have limited time and food. So I cannot waste my time waiting for daylight.',
        options: [
            {
                text: 'Enter the cave',
                nextText: 7,
            }
        ]
    },
    {
        id: 7,
        text: 'The mouth of the cave is huge. I can feel that the surface of the cave is wet and slippery. A weird and antique smell is coming out of the cave.',
        options: [
            {
                text: 'Keep exploring',
                nextText: 8,
            }
        ]
    },
    {
        id: 8,
        text: 'I\'ve soon discovered that the cave has various ways. All the ways look exactly the same. But one of them is unique, it has footprints on it\'s surface. The footprints suggest that someone came here before me.',
        options: [
            {
                text: 'Follow the footprints.',
                nextText: 10,
            },
            {
                text: 'Don\'t follow footprints. Randomly follow other paths.',
                nextText: 9,
            }
        ]
    },
    {
        id: 9,
        text: 'I decided to randomly follow paths. It was indeed a bad idea. I\'ve soon lost myself in this mysterious cave. My torch is running out of battery as well. I don\'t think I will be able to get out of here alive.',
        options: [
            {
                text: 'Game Over. You died.',
                nextText: 1,
            }
        ]
    },
    {
        id: 10,
        text: 'I decided to follow the footprints. I\'ve started to become weaker and weaker. I walked for about 30 minutes. Then I dimly saw a weird figure lying down on the surface of the cave. When I aimed my torch into it, shivers went down my spine. I saw a human skeleton lying down on the surface. I couldn\'t go near it because of the terrible smell. But I saw a piece of page on it\'s hand.',
        options: [
            {
                text: 'Pick up the page.',
                nextText: 11,
            }
        ]
    },
    {
        id: 11,
        text: 'I picked up the paper. A letter was written on it. Probably the guy wrote this letter before dying.',
        options: [
            {
                text: 'Read the letter',
                nextText: 12,
            }
        ]
    },
    {
        id: 12,
        text: 'The letter is stated below:\n\n"14 March 1874.\nMy name is Thiago Alvarez. I\'m 26 years old. Florence Alvarez, the great Portuguese sailor, is my ancestor.\nMy ship sank in West Africa. I, along with 7 others, managed to swim and reach the shore. Then we entered this infamous forest. All of my friends died due to hunger. I\'m the only survivor.\nI\'ve discovered many secrets about this forest. An old civilization was used to stay here, but soon it vanished without a trace. There are many diamond mines hidden in this forest. I tried to search for them. But soon I realized that it was a big mistake. Because this forest is protected by a strange prodigious creature, named "The Bunyip".\nI have seen this creature yesterday, dimly from a distance. His face still hunts me in my nightmares. He probably lives in this cave. He is the guardian of the diamond mines.\nDear friend, if you\'ve also entered this forest and found this letter, please get out of here as soon as possible. The Bunyip may find you soon."',
        options: [
            {
                text: 'Next',
                nextText: 13,
            }
        ]
    },
    {
        id: 13,
        text: 'I must escape this forest as soon as possible.',
        options: [
            {
                text: 'Next',
                nextText: 14,
            }
        ]
    },
    {
        id: 14,
        text: 'Congratulations! You\'ve completed chapter 1.',
        options: [
            {
                text: 'Play Chapter 2',
                url: 'chapter2.html'
            },
            {
                text: 'Re-play Chapter 1',
                url: 'chapter1.html'
            },
            {
                text: 'Home',
                url: 'index.html'
            }
        ]
    }
];



startGame();

