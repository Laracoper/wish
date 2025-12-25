document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('myForm').addEventListener('submit', function (event) {
    //     event.preventDefault(); // Предотвращаем стандартную отправку формы
    //     const url = 'https://script.google.com/macros/s/AKfycbztFIE-YiRFpcSWG6i6mETN8cJQTyu5bWNP8bD85HM7_VRQ0CFb1FyQq9pgxy9AVHjfAg/exec';
    //     const formData = new FormData(this);


    //     fetch(url, {
    //         method: 'POST',
    //         body: formData,
    //         // headers: {
    //         //     'Content-Type': 'application/json'
    //         // },
    //         // mode: "no-cors"
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 alert('Данные отправлены!');
    //                 this.reset(); // Сбрасываем форму
    //             } else {
    //                 alert('Ошибка отправки!');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
    // });


    // ----validate---

    function validateForm(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        const form = event.target;
        const formData = new FormData(form);
        let isEmpty = false;

        // Перебираем все пары (ключ, значение) в FormData
        for (const [key, value] of formData.entries()) {
            // Проверяем, если поле текстовое (игнорируем файлы, например)
            // и значение пустое или состоит только из пробелов
            if (typeof value === 'string' && value.trim() === '') {
                console.log(`Поле "${key}" пустое или содержит только пробелы.`);
                isEmpty = true;
                // Можем добавить класс к элементу, если нужно подсветить
                form.querySelector(`[name="${key}"]`).classList.add('error');
            } else {
                // Если поле не пустое, удаляем класс ошибки
                form.querySelector(`[name="${key}"]`).classList.remove('error');
            }
        }

        if (isEmpty) {
            // alert('Пожалуйста, заполните все обязательные поля!');
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Пожалуйста, заполните все обязательные поля!",
                // footer: '<a href="#">повторить</a>'
            });
        } else {
            console.log('Форма валидна. Отправляем данные...');
            // Здесь можно отправить данные, например, с помощью fetch
            // fetch('/submit-form', { method: 'POST', body: formData });
            fetch('https://script.google.com/macros/s/AKfycbxIKq5KJdoka6vliAmXygyJCByaGAmxyPGqQnn7u9A5DB0joY4lYPJEFMbbqv5Wr_fQvg/exec', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // mode: "no-cors"
            })
                .then(response => {
                    if (response.ok) {
                        // alert('Данные отправлены!');
                        Swal.fire({
                            icon: "success",
                            title: "Запрос на волшебство добавлен !",
                        });
                        this.reset(); // Сбрасываем форму
                    } else {
                        alert('Ошибка отправки!');
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }
    }

    //---end val--

    const form = document.getElementById('myForm');
    if (form) {
        form.addEventListener('submit', validateForm);
    }



})