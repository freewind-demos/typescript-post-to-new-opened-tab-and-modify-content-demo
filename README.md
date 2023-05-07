TypeScript Vite Post to New Opened Tab and Modify Content Demo
===========================

form的结果submit到一个新的tab里之后，如何修改其内容

1. 首先需要在onsubmit中创建一个新的空tab，并指定name
2. 然后把form的target改为该name
3. form submit后，会将结果写到该tab中
4. 该tab之前的window对象会被销毁，打开新url，生成新window对象。

这时会遇到难题：如果我们之前进行window.addEventListener('load')，此时不会被执行，因为window对象没了

我们怎么知道window对象变化了，并在合适时机插入我们要执行的代码?

好在生成new tab时拿到的window对象是一个WindowProxy，它像一个容器，其 newTab.window对象会被替换为新window，所以我们只要有newTab对象，就有机会拿到新的window对象。

但是没有window change event，所以我们需要找到别的办法。经过尝试，发现可以：

 
1. 对旧window对象添加unload event handler，它会在form submit替换新tab内容前被执行
2. 此时旧window对象不能使用，新window对象也未生成，所以需要借助 setTimeout 做一个短暂等待，它会在新window对象生成后被调用
3. 在setTimeout中调用对新window对象设置load event handler，插入修改逻辑

```
npm install
npm run demo
```

It will open page on browser automatically.
