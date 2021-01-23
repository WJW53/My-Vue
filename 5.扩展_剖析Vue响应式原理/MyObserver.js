const data = {
    name: "wjw",
    age: 18,
    wjw: {
        name: "wujingwei",
        age: 21
    },
    arr: [0, 1,]
}

const arrayProto = Array.prototype;//保存数组原型
const arrayMethods = Object.create(arrayProto);//避免污染真正的数组原型
['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(method => {
    arrayMethods[method] = function () {//针对数组变异方法
        arrayProto[method].call(this, ...arguments);
        render();
    }
})


function defineReactive(data, key, value) {//设置属性及其值
    observer(value);//递归监听

    Object.defineProperty(data, key, {
        //获取，读
        get() {
            console.log('读');
            return value;
        },
        //设置，写
        //参数是被重新赋予的值
        set(newVal) {
            console.log('写');
            // console.log(newVal);
            if (value === newVal) {//如果数据一样，就没必要重新渲染
                return;
            }
            value = newVal;
            render();
        }
    });
}


function observer(data) {//监听数据
    if (Array.isArray(data)) {
        data.__proto__ = arrayMethods;//使得数组变异方法的原型改到我们克隆的重写后的原型上
        return;
    }
    if (typeof data === 'object') {//是对象才深度监听
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }

}

function render() {//页面渲染函数,我们这里只是为了证明数据改变了该渲染了而已,并未实现真正的render
    console.log('页面渲染啦！');
}


function $set(data, key, value) {//对象的增
    if (Array.isArray(data)) {//如果我们想让数组也可以用$set的话
        data.splice(key, 1, value);//从索引key处,截取一个,插入value值
        return value;
    }
    defineReactive(data, key, value);//调用defineReactive观察数据并设置属性及其值
    render();//然后重新渲染页面
    return value;//最后返回value值
}
function $delete(data, key) {//对象的删
    if (Array.isArray(data)) {
        data.splice(key, 1);
        return;
    }
    delete data[key];//对象属性直接delete就行了
    render();
    return;
}


observer(data);

// console.log(data.name, data.age);
// data.name = "xxx";
// data.age = 20;
// console.log(data.name, data.age);
// data.wjw.name = "WJW";
// console.log(data.wjw);

// data.ttt = 3;


// data.arr.push(100);
// data.arr.reverse();
// console.log(data.arr);

$set(data.arr, 6, 3);//因为splice如果索引大于length-1就自动再加一位了
console.log(data.arr);//[0,1,3]

$delete(data.arr, 0);
console.log(data.arr);

$delete(data,"age");
console.log(data);