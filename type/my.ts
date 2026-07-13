interface EntrySchoolYearMonth {
    year: number
    month: number
}

export interface MyCartItem {
    id: number
    good_id: number
    good_type: number
    university_id: number
    university_name_cn: string
    university_name_en: string
    logo: string
    course_name_cn: string
    course_name_en: string
    price_cny: number
    price_gbp: number
    num: number
    buy_multiple_at_a_time: number
    entry_school_year_month: EntrySchoolYearMonth
    entry_school_year_month_options: Array<EntrySchoolYearMonth>
    is_valid: boolean
}
