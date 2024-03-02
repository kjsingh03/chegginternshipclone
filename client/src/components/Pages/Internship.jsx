import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import logo from "../../assets/logo.png";
import { PDFDocument, rgb } from 'pdf-lib'
import pdf from './cert.pdf'
import font from './Sanchez-Regular.ttf'
import fontkit from '@pdf-lib/fontkit'

function Internship() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [internship, setInternship] = useState({})
    const [access, setAccess] = useState(false)
    const [generated,setGenerated] = useState(false)

    const user = JSON.parse(localStorage.getItem("credentials"))

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
                setGenerated(user?.certificates.filter(certificate=>certificate?.internship===res.data.internship._id)[0])
                for(let data in user?.internships){
                    if(user?.internships[data]===res.data.internship._id){
                        setAccess(true)
                        break;
                    }
                }
            })
            .catch(err => console.log(err));
    }, [setGenerated])

    

    const handleClick = (price) => {
        axios.post("http://localhost:8080/pay", {
            amount: price * 100,
            currency: "INR",
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            var options = {
                "key": "rzp_test_dI2cMfs9QmKiFd",
                "amount": price * 100,
                "currency": "INR",
                "name": "Chegg Internships",
                "description": "Test Transaction",
                "image": logo,
                "order_id": res.data.id,
                "handler": (response) => {
                    console.log(response)
                    axios.put("http://localhost:8080/user", { username: user.username, internship: internship }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        localStorage.setItem("credentials", JSON.stringify(res.data.user))
                        
                        axios.put(`http://localhost:8080/internship/${id}`, { studentsEnrolled: user?._id }, {
                            headers: {
                                "Authorization": user?.token,
                                "Content-Type": "application/json"
                            }
                        }).then(() => navigate("/profile"))
                            .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                },
                "prefill": {
                    "username": user.username,
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
        })
            .catch(err => console.log(err))
    }

    const getCertificate = () => {
        const userName = user?.name;

        let codeId = ""

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
            firstPage.drawText(name, {
                x: 310,
                y: 300,
                size: 30,
                font: SanChezFont,
                color: rgb(0.96, 0.85, 0.17),
            });

            firstPage.drawText(`For outstanding completion of ${internship.position} `, {
                x: 170,
                y: 265,
                size: 20,
                font: SanChezFont,
                color: rgb(0.04, 0.08, 0.3),
            });
            firstPage.drawText(`internship program at ${internship.organisation}. `, {
                x: 240,
                y: 240,
                size: 20,
                font: SanChezFont,
                color: rgb(0.04, 0.08, 0.3),
            });

            const string = "abcdefghijklmnopqrstuvwxyz0123456789";
            codeId = "";

            for (let i = 0; i < 8; i++) {
                codeId += string[Math.floor(Math.random() * string.length)];
            }

            firstPage.drawText(`codeid : ${codeId}`, {
                x: 650,
                y: 80,
                size: 10,
                font: SanChezFont,
                color: rgb(0, 0, 0),
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // this was for creating uri and showing in iframe

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

            axios.put(`http://localhost:8080/internship/${internship.id}`, { certificates: { user: user?._id, codeId: codeId } }, {
                headers: {
                    "Authorization": user?.token,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    axios.put(`http://localhost:8080/user`, { username:user?.username,certificates: { internship: internship?._id, generated: true,codeId:codeId } }, {
                        headers: {
                            "Authorization": user?.token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            console.log(response.data)
                            setGenerated(true)
                            localStorage.setItem("credentials", JSON.stringify(response.data.user))
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })

            var file = new File(
                [pdfBytes],
                "Certificate_Verification.pdf",
                {
                    type: "application/pdf;charset=utf-8",
                }
            );
            saveAs(file);


        };

        //check if the text is empty or not
        if (val.trim() !== "") {
            // console.log(val);
            generatePDF(val);
        } else {
            console.log("error")
        }


    }

   

    return (
        <>
            <Navbar />
            <div className="w-full lg:w-[90%] xl:w-[80%] p-10 mx-auto py-[8rem] flex flex-col gap-6">
                <h3 className="text-lg font-bold">{internship.position}</h3>
                <h2 className="text-base font-bold">{internship.organisation}</h2>
                <div className="flex md:flex-row flex-col w-full gap-6 md:items-center justify-between">
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-location-dot"></i> {internship.location} </p>
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-money-bill"></i> {internship.stipend}/month </p>
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-calendar-days"></i>{internship.startTime === 1 ? '1 Month' : `1 - ${internship.startTime} Months`} </p>
                    <p className='flex items-center gap-2'><i className="fa-solid fa-hourglass-end"></i> {internship.lastApplyDate?.split("T")[0].replace(/-/g, "/")}</p>
                </div>
                <h2 className="text-base font-bold">Skill(s) required</h2>
                <div className="flex items-center gap-12">
                    {internship?.skills?.map((skill, index) => (
                        <p key={index} className='flex items-center gap-2'>{skill} </p>
                    ))}
                </div>
                <h2 className="text-base font-bold">Perks</h2>
                <div className="flex items-center gap-12">
                    {internship?.perks?.map((perk, index) => (
                        <p key={index} className='flex items-center gap-2'>{perk} </p>
                    ))}
                </div>
                <h2 className="text-base font-bold">Price</h2>
                <p className='flex items-center gap-2'>{internship.price} </p>
                {
                    !access &&
                    <div onClick={() => handleClick(internship.price)} className="btn w-max h-12">Buy Now</div>
                }
                {
                    access && !generated?.generated && !generated &&
                    <div className="">
                        <div onClick={getCertificate} className="btn w-max h-12">Get Certificate</div>
                    </div>
                }
            </div >
        </>
    )
}

export default Internship
