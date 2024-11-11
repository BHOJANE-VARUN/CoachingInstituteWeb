'use client'

import React, { useEffect, useState } from "react"
import { PlusCircle } from "lucide-react"
import { BASE_URL } from "../../contants/Links"

// Simplified Button component
const Button = ({ children, onClick, type = "button", variant = "default" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium text-sm ${
      variant === "default"
        ? "color text-white hover:bg-orange-700"
        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
)

// Simplified Card components
const Card = ({ children }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg">{children}</div>
)

const CardHeader = ({ children }) => (
  <div className="px-4 py-5 sm:px-6">{children}</div>
)

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-medium text-gray-900">{children}</h3>
)

const CardContent = ({ children }) => (
  <div className="px-4 py-5 sm:p-6">{children}</div>
)

// Simplified Dialog components
const Dialog = ({ open, onOpenChange, children }) => (
  open ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => onOpenChange(false)}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  ) : null
)

const DialogContent = ({ children }) => (
  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
)

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
)

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-medium text-gray-900">{children}</h3>
)

// Simplified Input component
const Input = ({ id, value, onChange, required }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
  />
)

// Simplified Label component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
)

// Simplified Textarea component
const Textarea = ({ id, value, onChange, required }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
    rows={3}
  />
)

export default function AddNotices() {
  const [notices, setNotices] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [newNotice, setNewNotice] = useState({ notice_name: '', notice_description: '' ,author:''})

  useEffect(()=>{
    const fetchdata = async ()=>{
        const raw = await fetch((BASE_URL+"/viewNotice"));
        const data = await raw.json();
        console.log(data);
        setNotices(data);
    }
    fetchdata();
},[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const notice = {
      id: notices.length + 1,
      notice_name: newNotice.notice_name,
      notice_description: newNotice.notice_description,
      author: newNotice.author, // This would typically come from authentication
      date: new Date().toISOString().split('T')[0]
    }
    //console.log(newNotice);
    try {
        await fetch((BASE_URL+"/addNotice"),{
          method:"POST",
          body:JSON.stringify({
              "notice_name":newNotice.notice_name,
              "notice_description":newNotice.notice_description,
              "author":newNotice.author,
          }),
          headers:{
            'Content-Type': 'application/json', 
          }
        })
    } catch (e) {
      console.log(e);
    }
    setNotices([...notices, notice])
    setNewNotice({ notice_name: '', notice_description: '' ,author:''})
    setIsOpen(false)
  }
  if(notices==null)
  {
    return <div>Loading....</div>
  }
   //{author: 'Coordinator', notice_date: '2024-11-10', notice_description: 'CIA is going to be started from coming Monday.', notice_id: 1, notice_name: 'CIA Test'}

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl mt-9 font-bold">Notices</h1>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4 inline" /> Add Notice
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Notice</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newNotice.notice_name}
                onChange={(e) => setNewNotice({ ...newNotice, notice_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newNotice.notice_description}
                onChange={(e) => setNewNotice({ ...newNotice, notice_description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={newNotice.author}
                onChange={(e) => setNewNotice({ ...newNotice, author: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <CardTitle>{notice.notice_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{notice.notice_description}</p>
            </CardContent>
            <div className="flex text-base  justify-between p-5 font-semibold  text-gray-500">
              <span>{notice.author}</span>
              <span>{notice.notice_date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}