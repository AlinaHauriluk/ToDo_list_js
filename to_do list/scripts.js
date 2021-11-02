class To_do {
    constructor() {
        this.data = [];

        this.data_done = [];
    }

    show() {
    
        this.list.innerHTML = '';

        this.data.forEach(el => {

            let li = document.createElement('li');
            this.list.append(li);

            let p = document.createElement('p');
            p.innerHTML = el;

            let span_edit = document.createElement('span');
            span_edit.classList.add('edit');

            let span_delete = document.createElement('span');
            span_delete.classList.add('delete');

            let button = document.createElement('button');
            button.innerHTML = 'done';
            button.classList.add('check');

            li.append(button, p, span_edit, span_delete);

            span_delete.addEventListener('click', event =>{
                this.delete_data(event);
            })
    
            span_edit.addEventListener('click', event =>{
                this.edit(event);
            })
            
            button.addEventListener('click', event=> {
                this.done(event);
            })
        })
    }

    delete_data(event) {
        
        let li = event.target.closest('li');
            
        if(!li) return;

        li.remove();

        let p = li.querySelector('p').textContent;

        this.data.forEach((el, index) => {
            if(p == el) {
                this.data.splice(index, 1);
            }
        }) 

        this.show();
    }

    edit(event) {
        let input = document.querySelector('.task');

        let li = event.target.closest('li');

        if(!li) return;

        let p = li.querySelector('p');

        input.value = p.textContent;

        let button = document.querySelector('button');

        button.addEventListener('click', event => {
            this.data.map((el, index) => {
                if(p.textContent == el) {
                    let index_ = this.data.length - 1;
                   
                    this.data.splice(index, 1, this.data[index_]); 
                    
                    this.data.splice(this.data.length - 1, 1); 
                }
            })
            this.show();
        })
    }

    done(event) {
        let li = event.target.closest('li');
        let p = li.querySelector('p');
        let span = li.querySelector('span')

        this.data_done.push(p.textContent);

        this.done_show();

        this.data.forEach((el, index) => {
            if(el == p.textContent) {
                this.data.splice(index, 1);
                this.show();    
            }
        }) 
    }

    done_show() {
        if(document.querySelector('.do_list')) {
            document.querySelector('.do_list').remove();
        }

        let div = document.createElement('div');
        div.classList.add('do_list');
        document.querySelector('.todo_list').append(div);

        let h3 = document.createElement('h3');
        h3.classList.add('title');
        h3.innerHTML = 'DONE';

        let ul = document.createElement('ul');
        ul.classList.add('list');

        div.append(h3, ul);

        if(this.data_done.length == 0) {
            document.querySelector('h3').classList.add('none');  
        } 

        this.data_done.forEach(el => {
            let li_done = document.createElement('li');
            ul.append(li_done);

            let p_done = document.createElement('p');
            p_done.classList.add('p_done');
            p_done.classList.add('it');
            p_done.innerHTML = el;

            let span_delete_done = document.createElement('span');
            span_delete_done.classList.add('delete');

            let button_add = document.createElement('button');
            button_add.innerHTML = 'to do';
            button_add.classList.add('check');

            li_done.append(button_add, p_done, span_delete_done);

            span_delete_done.addEventListener('click', event => {
                this.done_delete(event);
            })

            button_add.addEventListener('click', event => {
                this.done_add(event);
            })
        })
    }

    done_delete(event) {
        let li = event.target.closest('li');
        if(!li) return;

        let p = li.querySelector('p');

        this.data_done.forEach((el, index) => {
            if(el == p.textContent) {
                this.data_done.splice(index, 1);
                li.remove();

                this.done_show()
            }
        })
    }

    done_add(event) {
        let li = event.target.closest('li');
        if(!li) return;

        let p = li.querySelector('p');

        this.data_done.forEach((el, index) => {
            if(el == p.textContent) {
                this.data_done.splice(index, 1);
                li.remove();
                this.done_show()

                this.data.unshift(el);
                this.show();
            }
        }) 
    }

    get_data() {
        this.list = document.createElement('ul');
        this.list.classList.add('list');
        document.querySelector('.todo_list').append(this.list);

        let input = document.querySelector('.task');

        input.addEventListener('keyup', event=>{
            if(event.key == 'Enter') {
                this.data.push(input.value);

                input.value = '';

                this.show();
            }
        })

        let button = document.querySelector('button');

        button.addEventListener('click', event =>{
            this.data.push(input.value);

            input.value = '';

            this.show();
        })
    }
}

window.addEventListener('load', function(){
    let to_do = new To_do(); 
    
    to_do.get_data()
})



































