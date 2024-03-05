var mserver = "http://211.177.13.242:5000"; 

function toggleGroupBox() {
    var groupBox = document.getElementById("passwordGroupBox");
    groupBox.style.display = (groupBox.style.display === "none" || groupBox.style.display === "") ? "block" : "none";
}

function postData() {
    botinfo(document.getElementById("password").value)
}

function showtimeline(feeddata) {
    document.querySelector("#contentsbox").innerHTML = ''
    let i=0;
    while(i<feeddata.length){
        var master = document.createElement('div')
        master.setAttribute('class',"masterholder")
        document.querySelector("#contentsbox").appendChild(master)

        var holder = document.createElement('div')
        holder.setAttribute('id',"fd"+i)
        holder.setAttribute('class',"contentholder")
        master.appendChild(holder)

        var pimg = document.createElement('img')
        pimg.setAttribute('class',"pimage")
        pimg.setAttribute('src',feeddata[i].actor.profile_image_url)
        holder.appendChild(pimg)

        var pholder = document.createElement('div')
        pholder.setAttribute('class',"profileholder")
        holder.appendChild(pholder)
        pholder.style.marginLeft = "10px"
        pholder.style.display = "inline-block"

        var pname = document.createElement('label')
        pname.setAttribute('class',"pname")
        pname.textContent = feeddata[i].actor.display_name
        pholder.appendChild(pname)
        pholder.appendChild(document.createElement('br'))

        var pid = document.createElement('pre')
        pid.setAttribute('class',"pid")
        pid.textContent = feeddata[i].actor.id+"\n"+feeddata[i].updated_at
        pholder.appendChild(pid)

        var pcnt = document.createElement('pre')
        pcnt.setAttribute('class',"pcontent")
        pcnt.textContent = feeddata[i].content
        pholder.appendChild(pcnt)

        master.appendChild(document.createElement('hr'))
        i++
    }
}

function showstatus(stats) {
    document.querySelector("#contentsbox").innerHTML = ''
    var holder = document.createElement('div')
    holder.setAttribute('id',"fd"+i)
    holder.setAttribute('class',"contentholder")
    document.querySelector("#contentsbox").appendChild(holder)
    let i=0;
    var varr = Object.keys(stats)
    while(i<varr.length){
        var nkey = document.createElement('label')
        nkey.setAttribute("class","pname")
        nkey.textContent = varr[i] + ' : '

        var nval = document.createElement('label')
        nval.setAttribute("class","pcontent")
        nval.textContent = stats[varr[i]]

        holder.appendChild(nkey)
        holder.appendChild(nval)
        holder.appendChild(document.createElement('br'))
    }
}

function gettimeline() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", mserver, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Xauth", encodeURIComponent(password));
    xhr.setRequestHeader("Xcmd", 'timeline');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            feeddata = JSON.parse(xhr.responseText);
            
            showtimeline(feeddata)
        }
    };
}

function getstatus() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", mserver, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Xauth", encodeURIComponent(password));
    xhr.setRequestHeader("Xcmd", 'status');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            stdata = JSON.parse(xhr.responseText);
            showstatus(stdata)
        }
    };
}

function botinfo(xcmds) {
    var password = document.getElementById("password").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", mserver, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Xauth", encodeURIComponent(password));
    xhr.setRequestHeader("Xcmd", xcmds);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
}
