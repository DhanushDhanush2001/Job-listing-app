import {create} from 'zustand'

const useJobStore = create((set)=>({
    jobs:[],
    setJobs: ((jobs)=> set(jobs)),
    getAllJobs: async(search = '')=>{
        try{
            const res = await fetch(`/api/v1/job/getAllJobs?search=${encodeURIComponent(search)}`)
            const data = await res.json()
            if(!res.ok || !data.success){
                return {success: false, message: data.message}
            }
            set({jobs: data.data})
            return {success: true, message: data.message}
        }catch(err){
            console.log(`Get All Jobs Error : ${err.message}`)
             return {success: false,message: err.message}
        }
    },

    postJob: async(newJob)=>{
        try{
            const {title,company,location,type,description} = newJob;
            const res = await fetch(`/api/v1/job/postjob`,{
                method: 'POST',
                headers:{
                    'content-Type' : 'application/json'
                },
                body: JSON.stringify(newJob)
            })
            const data = await res.json()
             if(!res.ok || !data.success || !title || !company || !location || !type || !description){
                return {success: false, message: data.message}  
        }
        set((state)=> ({jobs: [...state.jobs, data.data]}))
        return {success: true, message: data.message}
    } catch(err){
        console.log(`Post Job Error : ${err.message}`)
            return {success: false,message: err.message}
    }
    }
}))

export default useJobStore