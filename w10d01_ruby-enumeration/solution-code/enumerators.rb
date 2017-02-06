
def custom_map(list)
  out = []
  list.each { |e| out << yield(e) }
  out 
end

# def custom_sort_by(list)
#   yielded_list = custom_map(list) { |a| [yield(a), a] }.sort
#   custom_map(yielded_list){ |a| a[1] }
# end

# def custom_select
#   def select
#   [].tap { |out| each { |e| out << e if yield(e) } }
# end
# end


# def sort_by
# end

# def reduce(*args)
# end
