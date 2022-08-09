import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

// www.themealdb.com/api/json/v1/1/random.php



export default function Home() {
  const [data, setData] = useState(null)
  function GetRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()).then(data => {
    console.log(data)
    // get all the ingredients and put them in an array
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
      ingredients.push(data.meals[0][`strIngredient${i}`])
    }
    // get all the measures and put them in an array
    let measures = []
    for (let i = 1; i <= 20; i++) {
      measures.push(data.meals[0][`strMeasure${i}`])
    }
    let ingredientsAndMeasures = []
    ingredients.filter(ingredient => ingredient!=='').forEach((ingredient, index) => {
      ingredientsAndMeasures.push({
        ingredient: ingredient,
        measure: measures[index]
      })
    } )

    setData({
      name: data.meals[0].strMeal, 
      image: data.meals[0].strMealThumb,
      from: data.meals[0].strArea,
      type: data.meals[0].strCategory,
      link: data.meals[0].strSource,
      youtube: data.meals[0].strYoutube,
      ingredients: ingredientsAndMeasures,
      instructions: data.meals[0].strInstructions
    })
    })
  }
  return (
    <div className="font-['Open_Sans'] flex w-full justify-center flex-col md:flex-row">
      <div className="p-4 h-screen flex max-w-2xl w-full ">
        <Head>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,700,800,900,500" rel="stylesheet" type="text/css" />
        </Head>
        <div className='space-y-4 w-full flex flex-col h-full'>
          <div className='p-4 rounded-md w-full shadow-xl flex-1 flex flex-col'>
            <div className='w-full relative flex-1'>
              <Image objectFit='cover' src={data ? data.image : 'https://www.themealdb.com/images/media/meals/wvqxqw1511786027.jpg'} alt='meal' layout='fill' />
            </div>
            <a href={data?.link} target="_" className='text-3xl font-black text-gray-900'>{data?.name}</a>
            <p className='text-lg text-gray-400'><span>{data?.from}</span> - {data?.type}</p>
          </div>
          <button onClick={GetRandomMeal} className='py-4 w-full text-white font-medium rounded-md shadow bg-[#66f]'>Generate New Meal</button>
        </div>
      </div>
      <div className="p-4 flex">
        <div className='p-4 rounded-md w-full shadow-xl flex-1 md:w-64'>
          <div className='grid grid-cols-2'>
            {data?.ingredients?.map((item, i) => (
              <>
                <p className='font-semibold text-gray-900'>{item.ingredient}</p>
                <p className=' text-gray-400 text-right'>{item.measure}</p>
              </>
            ))}
          </div>
          <p className='font-semibold mt-4'>instructions</p>
          <p>
            {data.instructions}
          </p>
        </div>
      </div>
    </div>
  )
}
