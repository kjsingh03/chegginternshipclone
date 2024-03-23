import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../InternshipSidebar/Sidebar';
import axios from 'axios';
import Component from '../whatsapp/Component';
import './components.css'
import '../../App.css'
import { PDFDocument, rgb } from 'pdf-lib'
import pdf from './cert.pdf'
import font from './Sanchez-Regular.ttf'
import fontkit from '@pdf-lib/fontkit'

function Lesson() {

  const { id, route } = useParams();
  const navigate = useNavigate()

  const [internship, setInternship] = useState({})
  const [lessons, setLessons] = useState([])
  const [lesson, setLesson] = useState({})
  const [test, setTest] = useState([])
  const [activeOptions, setActiveOptions] = useState([])
  const [disabled, setDisabled] = useState(true)

  let newActiveOptions = [...activeOptions]

  const user = JSON.parse(localStorage.getItem("credentials"))

  let userCertificate = user?.certificates?.filter(data => data?.internship === internship?._id)[0]

  useEffect(() => {
    axios.get(`http://localhost:8080/internship/${id}`)
      .then(res => {
        setInternship(res.data.internship)
        setTest(res.data.internship.questions)
        setLessons(res.data.internship.lessons)
        setLesson(res.data.internship.lessons[route.split("lesson")[1] - 1])
        if (res.data.internship?.questions?.length === 0)
          setDisabled(false)
      })
      .catch(err => console.log(err));

  }, [id])


  useEffect(() => {
    if (userCertificate)
      setDisabled(false)
  }, [userCertificate])


  useEffect(() => {
    setLesson(lessons[route.split("lesson")[1] - 1])
  }, [route])

  const getCertificate = () => {
    const userName = user?.name;

    const { PDFDocument, rgb, degrees } = PDFLib;

    const capitalize = (str, lower = false) =>
      (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
        match.toUpperCase()
      );

    const val = capitalize(userName);

    const generatePDF = async (name) => {
      const existingPdfBytes = await fetch(pdf).then((res) =>
        res.arrayBuffer()
      ).catch(err => console.log(err));

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);

      //get font
      const fontBytes = await fetch(font).then((res) =>
        res.arrayBuffer()
      );

      // Embed our custom font in the document
      const SanChezFont = await pdfDoc.embedFont(fontBytes);

      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Draw a string of text diagonally across the first page

      if (userCertificate) {
        firstPage.drawText(name, {
          x: 315,
          y: 374,
          size: 30,
          font: SanChezFont,
          color: rgb(0.121, 0.337, 0.517),
        });
        firstPage.drawText(`${userCertificate?.duration}`, {
          x: 421,
          y: 315,
          size: 16,
          font: SanChezFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(`${userCertificate?.name}`, {
          x: 540,
          y: 287,
          size: 16,
          font: SanChezFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(`${(userCertificate?.percentage)?.toFixed(2)}%`, {
          x: 634,
          y: 257,
          size: 16,
          font: SanChezFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(`${userCertificate?.codeId}`, {
          x: 678,
          y: 105,
          size: 16,
          font: SanChezFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(`${userCertificate?.date.split("T")[0].replace(/-/g, "/")}`, {
          x: 672,
          y: 85,
          size: 14,
          font: SanChezFont,
          color: rgb(0, 0, 0),
        });
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // this was for creating uri and showing in iframe

        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });


        var file = new File(
          [pdfBytes],
          "Certificate_Verification.pdf",
          {
            type: "application/pdf;charset=utf-8",
          }
        );

        saveAs(file);
      }
      else {
        let newPoints = 100;

        const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let codeId = "";

        for (let i = 0; i < 8; i++) {
          codeId += string[Math.floor(Math.random() * string.length)];
        }

        axios.put(`http://localhost:8080/internship/${internship.id}`, { certificates: { user: user?.username, codeId: codeId, courseName: internship.name } }, {
          headers: {
            "Authorization": user?.token,
            "Content-Type": "application/json"
          }
        })
          .then((res) => {
            axios.put(`http://localhost:8080/user`, { username: user?.username, certificates: { internship: internship?._id, generated: true, codeId: codeId, percentage: 100, name: internship.name, duration: internship.duration, date: new Date().toJSON().slice(0, 10) } }, {
              headers: {
                "Authorization": user?.token,
                "Content-Type": "application/json"
              }
            })
              .then((response) => {
                userCertificate = { internship: internship?._id, generated: true, codeId: codeId, percentage: 100, name: internship.name, duration: internship.duration, date: new Date().toJSON().slice(0, 10) }
                localStorage.setItem("credentials", JSON.stringify(response.data.user))
                setTimeout(() => generatePDF(user?.name), 1000)
              })
              .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))


      }

    };

    //check if the text is empty or not
    if (val.trim() !== "") {
      generatePDF(val);

    } else {
      console.log("error")
    }
  }

  const selectOption = (index, option) => {

    const optionsQuery = document.querySelectorAll(".options")

    optionsQuery[index]?.childNodes.forEach((child, index) => {
      child.classList.remove('active')
    })

    optionsQuery[index]?.childNodes[option].classList.toggle('active')

    newActiveOptions[index] = option
    setActiveOptions([...newActiveOptions])
  }

  const submitQuiz = () => {
    let newPoints = 0;

    activeOptions.forEach((option, index) => {
      if (test[index].options[activeOptions[index]]?.correct)
        newPoints += 1
    })

    if (newPoints >= test.length * 75 / 100) {
      const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let codeId = "";

      for (let i = 0; i < 8; i++) {
        codeId += string[Math.floor(Math.random() * string.length)];
      }

      axios.put(`http://localhost:8080/internship/${internship.id}`, { certificates: { user: user?.username, codeId: codeId, courseName: internship.name } }, {
        headers: {
          "Authorization": user?.token,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          axios.put(`http://localhost:8080/user`, { username: user?.username, certificates: { internship: internship?._id, generated: true, codeId: codeId, percentage: newPoints / test.length * 100, name: internship.name, duration: internship.duration, date: new Date().toJSON().slice(0, 10) } }, {
            headers: {
              "Authorization": user?.token,
              "Content-Type": "application/json"
            }
          })
            .then((response) => {
              localStorage.setItem("credentials", JSON.stringify(response.data.user))
              setDisabled(false)
              navigate(`/internship/${id}/certificate`)
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    }
    else {
      document.getElementById("error").innerText = "Marks less than 75% try again"
      setTimeout(() => document.getElementById("error").innerText = "", 1000)
      // console.log(document.getElementById("error"))
    }
  }

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-y-auto">
        <div className="min-h-screen">

          <Sidebar />
          <div className="w-full md:w-[90%] lg:w-auto mx-auto lg:ml-[18rem] pt-[6rem]">

            {
              /lesson/i.test(route) &&
              <div className='flex flex-col gap-6 items-center md:items-start text-center md:text-left'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{lesson?.lesson}</h1>
                {lesson?.url &&
                  <div style={{ display: lesson?.lesson ? 'block' : 'none' }} className="w-[90%] h-[50vw] md:mx-auto md:h-[46vw] lg:w-[95%] xl:w-[70%] xl:h-[70vh]">
                    <iframe style={{ display: lesson?.lesson ? 'block' : 'none', width: '100%', height: '100%' }} src={`https://www.youtube.com/embed/${lesson?.url}?si=2g_0geZbXlguYOu8&amp;controls=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  </div>
                }
                <p className="text-sm lg:text-lg font-medium w-full">{lesson?.description}</p>
              </div>
            }


            {
              route === 'test' &&
              <div className="flex flex-col gap-5 px-8 text-sm">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Test</h1>
                {test?.map((data, index) => (
                  <div className="testQuestion flex flex-col gap-5" key={index}>
                    <h1 className="text-xl">{data.question}</h1>
                    <div className="options grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <p onClick={() => { selectOption(index, 0) }} className='option border border-[#1B88F4] p-2 rounded-xl'>1. {data.options[0].option}</p>
                      <p onClick={() => { selectOption(index, 1) }} className='option border border-[#1B88F4] p-2 rounded-xl'>2. {data.options[1].option}</p>
                      <p onClick={() => { selectOption(index, 2) }} className='option border border-[#1B88F4] p-2 rounded-xl'>3. {data.options[2].option}</p>
                      <p onClick={() => { selectOption(index, 3) }} className='option border border-[#1B88F4] p-2 rounded-xl'>4. {data.options[3].option}</p>
                    </div>
                  </div>
                ))}
                <p className="text-red-500 h-6" id="error"></p>
                <button onClick={() => submitQuiz()} className='btn w-max text-sm mb-8'>Complete</button>
              </div>
            }



            {
              route === 'certificate' &&
              <div className="getCertificate px-8 md:px-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Get Certificate Here</h1>

                <button onClick={() => { if (disabled) { document.getElementById('error').innerText = "Kindly complete test first"; setTimeout(() => document.getElementById('error').innerText = "", 1000) } else { getCertificate() } }} className="btn p-2.5 my-8 text-sm sm:text-base">Download <i className="fa-solid fa-download"></i></button>
                <p className="text-red-500 h-6 py-4 font-medium" id="error"></p>
              </div>
            }

            {
              route === 'assignment' &&
              <div className="flex flex-col gap-4">

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Assignment</h1>
                <input value={internship?.assignmentTask || ""} type="text" name="name" readOnly className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold py-2">Steps to follow :</h1>
                <ul className='list-disc px-6'>
                  <li>Post your certificate on Linkedin</li>
                  <li>Complete the Assignment</li>
                  <li>Upload linkedin post url along with assignment zip file in below given drive link</li>

                </ul>
                <input value={internship?.assignmentUrl || ""} type="text" name="duration" readOnly className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
              </div>
            }

          </div>
        </div>
        <Component />
      </div>
    </>
  )
}

export default Lesson
